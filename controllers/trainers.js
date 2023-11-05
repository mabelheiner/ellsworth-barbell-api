const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db('ellsworth-barbell')
    .collection('trainers').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    })
}

const getSingle = async (req, res, next) => {
    const trainerId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .db('ellsworth-barbell')
    .collection('trainers')
    .find({_id: trainerId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createTrainer = async (req, res, next) => {
    const trainer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        specialty: req.body.specialty,
        hourlyRate: req.body.hourlyRate,
        scheduleAvailability: req.body.scheduleAvailability
    };
    const response = await mongodb.getDb()
    .db('ellsworth-barbell')
    .collection('trainers')
    .insertOne(trainer);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating trainer.');
    }
}

const updateTrainer = async (req, res, next) => {
    const trainerId = new ObjectId(req.params.id);
    const trainer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        specialty: req.body.specialty,
        hourlyRate: req.body.hourlyRate,
        scheduleAvailability: req.body.scheduleAvailability
    }
    const response = await mongodb.getDb()
    .db('ellsworth-barbell')
    .collection('trainers')
    .replaceOne({_id: trainerId}, trainer);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the trainer.');
    }
}

const deleteTrainer = async (req, res, next) => {
    const trainerId = new ObjectId(req.params.id);
    const response = await mongodb.getDb()
    .db('ellsworth-barbell')
    .collection('trainers')
    .deleteOne({_id: trainerId}, true);
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting the trainer.');
    }
}

module.exports = {
    getAll,
    getSingle,
    createTrainer,
    updateTrainer,
    deleteTrainer
};