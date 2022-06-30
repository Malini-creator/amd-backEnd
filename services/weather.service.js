const { CONSTANT_MSG } = require('../config/constant_messages');
const { weatherCheck, sendSMS } = require('./common.service')

//Checking weather condition for city and sending SMS
exports.weatherCheck = async (reqBody) => {
    try {
        const weather = await weatherCheck(reqBody.city)
        if( weather.status !== 200 || weather.status === 'error')
        {
            return {
                statusCode: 400,
                status: CONSTANT_MSG.STATUS.ERROR,
                message: weather.message.response.data.message
            };
        }

        const sms = await sendSMS(reqBody, weather.data)
        if( sms.status !== 200 || sms.status === 'error')
        {
            return {
                statusCode: 400,
                status: CONSTANT_MSG.STATUS.ERROR,
                message: sms.message.response.data.properties.to[0]
            };
        }

        return {
            statusCode: 200,
            status: CONSTANT_MSG.STATUS.SUCCESS,
            message: CONSTANT_MSG.WEATHER_GET_SUCCESS,
            data: {
                Temperature: weather.data.main.temp,
                City: reqBody.city.charAt(0).toUpperCase() + reqBody.city.slice(1),
                Time: sms.data.createdAt,
                Sms_Action: JSON.stringify(sms.data),
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