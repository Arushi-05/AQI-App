const express = require('express');
const app=express();
const cors = require('cors')
const PORT = 8000

app.use(cors());
require('dotenv').config();
app.use(express.json());
const aqiRouter = require('./src/routes/aqi')

app.use('/', aqiRouter)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


