require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const forecastRoute = require('./routes/forecast');

app.use(cors());
app.use(express.json());

// Serve static frontend files from 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api', forecastRoute);

// For any other route, serve index.html (to support client-side routing if needed)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
