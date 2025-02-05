const axios = require('axios');

// Função para buscar as vulnerabilidades
const getVulnerabilities = async (req, res) => {
    const { domain } = req.body;

    // Verifica se o domínio foi informado
    if (!domain) {
        return res.status(400).json({ message: 'Domínio ou IP é obrigatório' });
    }

    try {
        // Chave da API do Shodan (use variáveis de ambiente para maior segurança)
        const SHODAN_API_KEY = process.env.SHODAN_API_KEY;  // Agora usa uma variável de ambiente

        // Fazendo a requisição para a API do Shodan
        const response = await axios.get(`https://api.shodan.io/shodan/host/${domain}?key=${SHODAN_API_KEY}`);
        const data = response.data;

        if (data) {
            const vulnerabilities = [];

            // Verifica se existem portas abertas
            if (data.ports && data.ports.length > 0) {
                data.ports.forEach(port => {
                    vulnerabilities.push({
                        name: 'Porta Aberta',
                        description: `Porta ${port} aberta em ${domain}`
                    });
                });
            }

            // Verifica se existem informações de banner
            if (data.data && data.data.length > 0) {
                data.data.forEach(banner => {
                    vulnerabilities.push({
                        name: 'Informações de Banner',
                        description: `Informações de banner encontradas: ${banner.data}`
                    });
                });
            }

            // Se vulnerabilidades encontradas, retorna elas
            if (vulnerabilities.length > 0) {
                return res.json({ vulnerabilities });
            } else {
                return res.json({ message: 'Nenhuma vulnerabilidade encontrada.' });
            }
        } else {
            return res.json({ message: 'Nenhuma vulnerabilidade encontrada.' });
        }
    } catch (error) {
        console.error("Erro ao buscar no Shodan:", error);
        return res.status(500).json({ message: 'Erro ao buscar vulnerabilidades', error: error.message });
    }
    
};

module.exports = { getVulnerabilities };
