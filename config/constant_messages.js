module.exports.CONSTANT_MSG = {
    STATUS: {
        SUCCESS: 'success',
        ERROR: 'error'
    },
    SMS_URL: 'https://connect.routee.net/sms',
    BASE_URL: `https://api.openweathermap.org/data/2.5/weather?q={city}&appid=${process.env.WEATHER_APIKEY}`,
    TOKEN_URL: 'https://auth.routee.net/oauth/token?grant_type=client_credentials',
    WEATHER_GET_SUCCESS: 'Wearther details fetch succuessfully'
}