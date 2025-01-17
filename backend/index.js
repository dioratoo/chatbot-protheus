const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Porta dinâmica fornecida pelo Render
const dbPath = path.resolve(__dirname, '../database/chatbot.db');

app.use(cors());
app.use(bodyParser.json());

// Inicializa o banco de dados SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Rota GET para navegação direta
app.get('/ask', (req, res) => {
  res.send('Acesse esta rota usando o método POST para enviar perguntas.');
});

// Rota para responder perguntas
app.post('/ask', (req, res) => {
  const question = req.body.question; // Captura a pergunta do corpo da requisição
  const query = 'SELECT resposta FROM perguntas WHERE pergunta = ?'; // SQL para buscar a resposta

  db.get(query, [question], (err, row) => {
    if (err) {
      console.error('Erro ao buscar resposta:', err.message);
      res.status(500).json({ error: err.message }); // Erro no servidor
    } else if (row) {
      res.json({ resposta: row.resposta }); // Responde com a resposta encontrada
    } else {
      res.json({ resposta: 'Desculpe, não tenho uma resposta para isso no momento.' }); // Resposta padrão
    }
  });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
