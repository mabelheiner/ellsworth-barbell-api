const express = require('express');
const router = express.Router();

const exerciseController = require('../controllers/exercises');

router.get('/exercises', exerciseController.getAll);

router.get('/exercises/:id', exerciseController.getSingle);

router.post('/exercises', exerciseController.createExercise);

router.put('/exercises/:id', exerciseController.updateExercise);

router.delete('/exercises/:id', exerciseController.deleteExercise);

module.exports = router;