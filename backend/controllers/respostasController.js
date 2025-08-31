const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const salvarResposta = async (req, res) => {
  const { questionarioId, respostas } = req.body;

  try {
    // Salva cada resposta individualmente
    for (const r of respostas) {
      await prisma.resposta.create({
        data: {
          questionarioId: questionarioId,
          perguntaId: r.perguntaId,
          respostaTexto: r.resposta
        }
      });
    }

    console.log('Nova resposta recebida:', req.body);
    res.send('Respostas recebidas com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao salvar respostas' });
  }
};

module.exports = { salvarResposta };
