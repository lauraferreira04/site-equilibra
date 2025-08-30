// models/pergunta.js

let perguntas = [
  { id: 1, questionarioId: 1, texto: 'Como você está se sentindo hoje?', tipo: 'escala', ordem: 1 },
  { id: 2, questionarioId: 1, texto: 'Você dormiu bem?', tipo: 'multipla', ordem: 2, opcoes: ['Sim', 'Não'] },

  { id: 3, questionarioId: 2, texto: 'Quanto você se acha organizado?', tipo: 'escala', ordem: 1 },
  { id: 4, questionarioId: 2, texto: 'Você tem uma rotina estabelecida?', tipo: 'multipla', ordem: 2, opcoes: ['Sim', 'Não'] },

  { id: 5, questionarioId: 3, texto: 'Você acha importante ter uma rotina de estudos?', tipo: 'multipla', ordem: 1 },
  { id: 6, questionarioId: 3, texto: 'Você tem uma rotina de estudo?', tipo: 'multipla', ordem: 2, opcoes: ['Sim', 'Não'] }

];

module.exports = perguntas;
