const joi = require('joi');

module.exports.weatherCheck = joi.object({
    mobile: joi.string().required(),
    city: joi.string().required(),
});
