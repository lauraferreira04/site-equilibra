const listarPerguntas = async (req, res) => {
  const questionarioId = parseInt(req.params.id);

  try {
    const questionario = await prisma.questionario.findUnique({
      where: { id: questionarioId },
      include: { perguntas: true }  // inclui as perguntas
    });

    if (!questionario) {
      return res.status(404).json({ erro: 'Questionário não encontrado' });
    }

    res.json(questionario); // envia questionário completo com perguntas
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar perguntas' });
  }
};
