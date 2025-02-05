// Importando as dependências
const express = require('express');      // Express
const cors = require('cors');            // CORS
const osintRoutes = require('./routes/osintRoutes');  // Suas rotas personalizadas

// Criando a instância do express
const app = express();

// Middleware para permitir requisições de outros domínios
app.use(cors());

// Middleware para ler JSON no corpo da requisição
app.use(express.json());

// Definindo as rotas da aplicação
app.use('/api/osint', osintRoutes);

// Rota raiz
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

// Definindo a porta e inicializando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

require('dotenv').config();

