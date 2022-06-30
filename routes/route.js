const express = require('express');
const { weatherController } = require('../controllers');
const router = express.Router();

router.post('/weatherCheck', weatherController.weatherCheck);

module.exports = router;