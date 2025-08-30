const express = require('express');
const router = express.Router();
const { enviarEstatisticasPorEmail } = require('../controllers/estatisticasController');

router.post('/', enviarEstatisticasPorEmail); // POST /estatisticas/email

module.exports = router;
