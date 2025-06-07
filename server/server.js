require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const forecastRoute = require('./routes/forecast');

app.use(cors());
app.use(express.json());

app.use('/api', forecastRoute);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
