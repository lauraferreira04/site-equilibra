const respostas = require('../models/resposta');

const enviarEstatisticasPorEmail = (req, res) => {
  const { questionarioId, email } = req.body;

  // Aqui só simulamos o envio
  console.log(`Enviando estatísticas do questionário ${questionarioId} para ${email}`);
  
  // Normalmente aqui você faria a lógica real de enviar email
  res.send(`Estatísticas enviadas para ${email} (simulação)`);
};

module.exports = { enviarEstatisticasPorEmail };
