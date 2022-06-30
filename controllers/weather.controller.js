const { weatherService } = require('../services');
const { weatherCheck } = require('../validator/validation')
const { CONSTANT_MSG } = require('../config/constant_messages');

exports.weatherCheck = async (req, res) => {
  try {
    
    //Checking validation and call weather and sms services
    await weatherCheck.validateAsync(req.body);
    const weather = await weatherService.weatherCheck(req.body);
    return res.status(weather.statusCode).send(weather);

  } catch (error) {
    console.log("Error in Weathar Checking API: ", error);
    return res.status(500).send({ statusCode: 500, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
  }
};