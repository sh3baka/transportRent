const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const transportRoutes = require('./routes/transportRoutes');
const orderRoutes = require('./routes/orderRoutes');
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
app.use(cors());
app.use(userRoutes);
app.use(transportRoutes);
app.use(orderRoutes);

module.exports = app;
