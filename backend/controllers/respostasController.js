const respostas = require('../models/resposta');

const salvarResposta = (req, res) => {
  respostas.push(req.body); // adiciona a resposta enviada pelo front
  res.send('Resposta salva com sucesso!');
};

module.exports = { salvarResposta };
