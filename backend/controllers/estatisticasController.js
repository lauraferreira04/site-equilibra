const questionarios = require('../models/questionario');
const perguntas = require('../models/pergunta');
const { respostas } = require('./respostasController');

const obterEstatisticas = (req, res) => {
  const questionarioId = parseInt(req.params.id);

  // Pega perguntas desse questionário
  const perguntasDoQ = perguntas.filter(p => p.questionarioId === questionarioId);
  // Pega respostas desse questionário
  const respostasDoQ = respostas.filter(r => r.questionarioId === questionarioId);

  console.log('Perguntas:', perguntasDoQ);
  console.log('Respostas filtradas:', respostasDoQ);

  const estatisticas = perguntasDoQ.map(p => {
    // Todas as respostas da pergunta p
    const respostasPergunta = respostasDoQ.flatMap(r =>
      r.respostas.filter(resp => resp.perguntaId === p.id).map(resp => resp.resposta)
    );

    if (p.tipo === 'escala') {
      const soma = respostasPergunta.reduce((acc, val) => acc + Number(val), 0);
      const media = respostasPergunta.length ? soma / respostasPergunta.length : 0;
      return { pergunta: p.texto, tipo: p.tipo, media };
    }

    if (p.tipo === 'multipla') {
      const contagem = {};
      respostasPergunta.forEach(r => {
        contagem[r] = (contagem[r] || 0) + 1;
      });
      return { pergunta: p.texto, tipo: p.tipo, contagem };
    }

    return { pergunta: p.texto, tipo: p.tipo, info: 'Tipo não suportado' };
  });

  res.json(estatisticas);
};

module.exports = { obterEstatisticas };
