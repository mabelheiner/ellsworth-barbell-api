const express = require('express');
const router = express.Router();

const exerciseController = require('../controllers/exercises');
const validation = require('../middleware/validate');

router.get('/', exerciseController.getAll);

router.get('/:id', exerciseController.getSingle);

router.post('/', validation.saveExercise, exerciseController.createExercise);

router.put('/:id', validation.saveExercise, exerciseController.updateExercise);

router.delete('/:id', exerciseController.deleteExercise);

module.exports = router;