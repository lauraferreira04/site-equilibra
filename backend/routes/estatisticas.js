const express = require('express');
const router = express.Router();
const { obterEstatisticas } = require('../controllers/estatisticasController');

router.get('/:id', obterEstatisticas); // POST /estatisticas

module.exports = router;
