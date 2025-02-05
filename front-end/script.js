document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário padrão

    const domain = document.getElementById('domain').value;
    
    // Exibe a tela de carregamento
    document.getElementById('loading').style.display = 'block';
    document.getElementById('report').innerHTML = '';

    // Chama a função para buscar as vulnerabilidades (simulada)
    searchVulnerabilities(domain);
});

function searchVulnerabilities(domain) {
    // Simulação de uma requisição assíncrona
    setTimeout(() => {
        // Aqui você faria a chamada real ao back-end com Fetch ou Axios
        // Exemplo de resposta:
        const fakeResults = {
            domain: domain,
            vulnerabilities: [
                { name: 'Vulnerabilidade X', description: 'Descrição do problema.' },
                { name: 'Vulnerabilidade Y', description: 'Outro problema identificado.' }
            ]
        };

        displayResults(fakeResults);
    }, 3000); // Simula um tempo de espera de 3 segundos
}

function displayResults(results) {
    // Esconde o carregamento
    document.getElementById('loading').style.display = 'none';

    // Preenche os resultados na tela
    let reportContent = `<h3>Resultados para ${results.domain}</h3>`;
    results.vulnerabilities.forEach(vuln => {
        reportContent += `<div><strong>${vuln.name}</strong>: ${vuln.description}</div><br>`;
    });

    document.getElementById('report').innerHTML = reportContent;
}
