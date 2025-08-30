const questionarios = require('../models/questionario');
const perguntas = require('../models/pergunta');

const listarQuestionarios = (req, res) => {
  res.json(questionarios); // envia todos os questionários para o front
};

const listarPerguntas = (req, res) => {
  const id = parseInt(req.params.id);
  const perguntasDoQuestionario = perguntas.filter(p => p.questionarioId === id);
  res.json(perguntasDoQuestionario);
};

module.exports = { listarQuestionarios, listarPerguntas };
