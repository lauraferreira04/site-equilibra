const express = require('express');
const router = express.Router();
const { listarQuestionarios, listarPerguntas } = require('../controllers/questionariosController');

router.get('/', listarQuestionarios);         // GET /questionarios
router.get('/:id', listarPerguntas);          // GET /questionarios/:id

module.exports = router;
