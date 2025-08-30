const express = require('express');
const router = express.Router();
const { salvarResposta } = require('../controllers/respostasController');

router.post('/', salvarResposta);             // POST /respostas

module.exports = router;
