const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, './chatbot.db'); // Caminho absoluto para o banco de dados
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS perguntas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pergunta TEXT NOT NULL,
      resposta TEXT NOT NULL
    )
  `);

  console.log('Tabela criada ou já existente.');

  // Insira algumas perguntas e respostas iniciais
  db.run(`
    INSERT INTO perguntas (pergunta, resposta)
    VALUES
      ('O que é Protheus?', 'Protheus é um sistema ERP da TOTVS.'),
      ('Como acessar o Protheus?', 'Você pode acessar o Protheus pelo portal da TOTVS ou via desktop com o cliente instalado.');
  `);

  console.log('Perguntas e respostas iniciais adicionadas.');
});

db.close();
