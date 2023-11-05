const validator = require('../helpers/validate');

const saveExercise = (req, res, next) => {
    const validationRule = {
        exerciseName: { type: String, required: true },
        durationInMinutes: { type: Number, required: true },
        caloriesBurned: { type: Number, required: true },
        maxReps: { type: Number, required: true},
        maxWeight: { type: Number, required: true},
        distanceInMiles: { type: Number },
        heartRate: { type: Number },
        notes: { type: String },
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status){
            res.status(412).send({
                success: false,
                message: 'Invalid exercise format',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveTrainer = (req, res, next) => {
    const validationRule = {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true},
        specialty: {type: String, required: true},
        hourlyRate: {type: Number, required: true},
        scheduleAvailability: {type: String, required: true}
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status){
            res.status(412).send({
                success: false,
                message: 'Invalid trainer format',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveExercise,
    saveTrainer
}