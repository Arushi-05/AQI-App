const express = require('express');
const router = express.Router();
const axios = require('axios');
const cache = require('../middleware/cache');
const rateLimiter = require('../middleware/rateLimmiter');
router.get('/aqi/:place', rateLimiter(5,60),cache(120), async (req, res) => {
    try {
        console.log("Route handler started");
        const place = req.params.place;
        console.log("Place extracted from request params");
        if (!place || place === 'undefined') {
            return res.status(400).json({ error: "Place is required" });
        }
        const response = await axios.get(`${process.env.BASE_URL}/${place}/?token=${process.env.API_KEY}`);
        console.log("Response received from API");
        res.status(200).json(response.data);
    }
    catch (error) {
        console.error(error);   
        res.status(error.response?.status || 500).json({ message: error.message });
    }
});

module.exports = router;