const mongodb = require('../db/connect');

const getAll = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send('Get all the exercises.');
}

const getSingle = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send('Get single exercises');
}

const createExercise = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send('Get single exercise');
}

const updateExercise = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send('Update exercise');
}

const deleteExercise = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send('Delete exercise');
}

module.exports = {
    getAll,
    getSingle,
    createExercise,
    updateExercise,
    deleteExercise
};