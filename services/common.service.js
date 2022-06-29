var axios = require('axios');
var nodeBase64 = require('nodejs-base64-converter');
const { CONSTANT_MSG } = require('../config/constant_messages');

//Getting weather details
module.exports.weatherCheck = async (city) => {
    try {
        let url = CONSTANT_MSG.BASE_URL.replace('{city}', city);
        const config = {
            method: 'POST',
            url: url
        };
        const weather = await axios(config)
        return weather.data
    } catch (error) {
        console.log('error', error);
        return {
            statusCode: 500,
            status: CONSTANT_MSG.STATUS.ERROR,
            message: error,
        }
    }
}

//Sending SMS for mobile number
module.exports.sendSMS = async (mobile, weather) => {
    try {
        const token = await accessToken()
        const config = {
            "url": CONSTANT_MSG.SMS_URL,
            "method": "POST",
            "headers": {
                "authorization": "Bearer " + token.data.access_token,
                "content-type": "application/json"
            },
            data:
            {
                "from": "amdTelecom",
                "to":  mobile,
                "body": "Hi Malini, Current weather condition is "+ weather.main.temp + ' C'
            }
        };
        const sms = await axios(config)
        return sms.data
    } catch (error) {
        console.log('error', error);
        return {
            statusCode: 500,
            status: CONSTANT_MSG.STATUS.ERROR,
            message: error,
        }
    }
}

// Generating access token
const accessToken = async () => {
    try {
        let config = {
            "async": true,
            "crossDomain": true,
            "url": CONSTANT_MSG.TOKEN_URL,
            "method": "POST",
            "headers": {
                "authorization": "Basic " + nodeBase64.encode(process.env.TOKEN_KEY),
                "content-type": "application/x-www-form-urlencoded"
            }
        };
        const gstAccessToken = await axios(config)
        return gstAccessToken
    } catch (error) {
        console.log('error', error);
        return {
            statusCode: 500,
            status: CONSTANT_MSG.STATUS.ERROR,
            message: error,
        }
    }
}