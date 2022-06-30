const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv/config')

//Imports Routes 
app.use(express.json())
app.use(cors())
const routes = require('./routes/route');
app.use(routes);

// Listening on  port
app.listen(process.env.PORT, (err) => {
    if (err) { console.log(err); };
    console.log('Listening on port ' + process.env.PORT);
    
  })