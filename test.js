require('dotenv').config();
console.log('API KEY:', process.env.OPENWEATHER_API_KEY);
const axios = require('axios');

const apiKey = process.env.OPENWEATHER_API_KEY;
axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Delhi&units=metric&appid=${apiKey}`)
  .then(res => console.log(res.data))
  .catch(err => console.error(err.response ? err.response.data : err.message));