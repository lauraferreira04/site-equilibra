const respostas = []; // array "universo" de respostas

const salvarResposta = (req, res) => {
  const payload = req.body;
  respostas.push(payload); // adiciona a resposta enviada pelo front
  console.log('Nova resposta recebida:', payload); // confirma no backend
  res.send('Respostas recebidas com sucesso!');
};

module.exports = { salvarResposta, respostas };
