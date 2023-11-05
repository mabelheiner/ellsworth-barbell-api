const { mongo } = require('mongoose');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db('ellsworth-barbell').collection('exercises').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    })
}

const getSingle = async (req, res, next) => {
    const exerciseId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .db('ellsworth-barbell')
    .collection('exercises')
    .find({_id: exerciseId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createExercise = async (req, res, next) => {
    const exercise = {
        exerciseName: req.body.exerciseName,
        durationInMinutes: req.body.minutes,
        caloriesBurned: req.body.calories,
        maxReps: req.body.maxReps,
        maxWeight: req.body.weight,
        distanceInMiles: req.body.distance,
        heartRate: req.body.heartRate,
        notes: req.body.notes,
    };
    const response = await mongodb.getDb()
    .db('ellsworth-barbell')
    .collection('exercises')
    .insertOne(exercise);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the exercise.');
    }
}

const updateExercise = async (req, res, next) => {
    const exerciseId = new ObjectId(req.params.id);
    const exercise = {
        exerciseName: req.body.exerciseName,
        durationInMinutes: req.body.minutes,
        caloriesBurned: req.body.calories,
        maxReps: req.body.maxReps,
        maxWeight: req.body.weight,
        distanceInMiles: req.body.distance,
        heartRate: req.body.heartRate,
        notes: req.body.notes,
    }
    const response = await mongodb.getDb()
    .db('ellsworth-barbell')
    .collection('exercises')
    .replaceOne({_id: exerciseId}, exercise);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the exercise.');
    }
}

const deleteExercise = async (req, res, next) => {
    const exerciseId = new ObjectId(req.params.id);
    const response = await mongodb.getDb()
    .db('ellsworth-barbell')
    .collection('exercises')
    .deleteOne({_id: exerciseId}, true);
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting the exercise.');
    }
}

module.exports = {
    getAll,
    getSingle,
    createExercise,
    updateExercise,
    deleteExercise
};