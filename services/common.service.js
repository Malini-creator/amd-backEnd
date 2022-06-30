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
        return weather;

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
module.exports.sendSMS = async (smsDetails, weather) => {
    try {
        const token = await accessToken()
        const smsContent = CONSTANT_MSG.SMS_CONTENT.replace('{city}', smsDetails.city)
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
                "to": smsDetails.mobile,
                "body": smsContent + (Number(weather.main.temp)-273.15).toFixed(2) + ' C'
            }
        };

        const sms = await axios(config)
        return sms;

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
        return gstAccessToken;

    } catch (error) {
        console.log('error', error);
        
        return {
            statusCode: 500,
            status: CONSTANT_MSG.STATUS.ERROR,
            message: error,
        }
    }
}