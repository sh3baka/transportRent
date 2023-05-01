const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const app = express();

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(`Error connecting to MongoDB: ${err}`);
    });

app.use(express.json());
app.use(userRoutes);

module.exports = app;
