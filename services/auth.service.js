const { CONSTANT_MSG } = require('../config/constant_messages');
const { weatherCheck, sendSMS } = require('./common.service')

//Checking weather condition for city and sending SMS
exports.weatherCheck = async (reqBody) => {
    try {
        const weathar = await weatherCheck(reqBody.city)
        const sms = await sendSMS(reqBody.mobile, weathar)
        return {
            statusCode: 200,
            status: CONSTANT_MSG.STATUS.SUCCESS,
            message: CONSTANT_MSG.WEATHER_GET_SUCCESS,
            data: {
                Temperature: weathar.main.temp,
                City: reqBody.city,
                Time: sms.createdAt,
                Sms_Action: JSON.stringify(sms),
            }
        };
    } catch (error) {
        console.log('error', error);
        return {
            statusCode: 500,
            status: CONSTANT_MSG.STATUS.ERROR,
            message: error.message
        };
    }
};