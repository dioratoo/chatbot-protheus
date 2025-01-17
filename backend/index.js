const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Caminho para o banco de dados
const dbPath = path.resolve(__dirname, '../database/chatbot.db');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Rota GET para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando! Use a rota POST /ask para perguntas.');
});

// Rota POST para perguntas
app.post('/ask', (req, res) => {
  const question = req.body.question;
  const query = 'SELECT resposta FROM perguntas WHERE pergunta = ?';

  db.get(query, [question], (err, row) => {
    if (err) {
      console.error('Erro ao buscar resposta:', err.message);
      res.status(500).json({ error: err.message });
    } else if (row) {
      res.json({ resposta: row.resposta });
    } else {
      res.json({ resposta: 'Desculpe, não tenho uma resposta para isso no momento.' });
    }
  });
});

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
