const express = require('express');
const router = express.Router();

const exerciseController = require('../controllers/exercises');

router.get('/', exerciseController.getAll);

router.get('/:id', exerciseController.getSingle);

router.post('/', exerciseController.createExercise);

router.put('/:id', exerciseController.updateExercise);

router.delete('/:id', exerciseController.deleteExercise);

module.exports = router;