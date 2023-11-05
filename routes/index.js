const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/exercises', require('./exercises'));
router.use('/trainers', require('./trainers'));

module.exports = router;