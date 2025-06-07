const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const userForecasts = {};

console.log('Loaded API key:', process.env.OPENWEATHER_API_KEY);

router.post('/generate', (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) return res.status(400).json({ error: 'Name and location required' });

  const id = uuidv4();
  userForecasts[id] = { name, location };
  const uniqueUrl = `${req.protocol}://${req.get('host')}/api/user/${id}`;
  res.json({ url: uniqueUrl });
});

router.get('/user/:id', async (req, res) => {
  const user = userForecasts[req.params.id];
  if (!user) return res.status(404).json({ error: 'User not found' });

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(user.location)}&units=metric&appid=${apiKey}`
    );

    const weatherData = weatherRes.data;
    const forecast = `Weather in ${user.location}: ${weatherData.weather[0].description}, Temperature: ${weatherData.main.temp}°C`;

    res.json({ name: user.name, location: user.location, forecast });
  } catch (error) {
    console.error('Weather API error:', error.message);
    res.json({ name: user.name, location: user.location, forecast: 'Could not fetch weather data' });
  }
});

module.exports = router;
