const prisma = require('../prisma');

const obterEstatisticas = async (req, res) => {
  const questionarioId = parseInt(req.params.id);

  try {
    // Pega perguntas do questionário
    const perguntasDoQ = await prisma.pergunta.findMany({
      where: { questionarioId }
    });

    // Pega respostas do questionário
    const respostasDoQ = await prisma.resposta.findMany({
      where: { questionarioId }
    });

    const estatisticas = perguntasDoQ.map(p => {
      const respostasPergunta = respostasDoQ
        .filter(r => r.perguntaId === p.id)
        .map(r => r.respostaTexto);

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
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao obter estatísticas' });
  }
};

module.exports = { obterEstatisticas };
