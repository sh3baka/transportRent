const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['car', 'motorcycle']
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    baseLocation: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rentalPrice: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    reservations: [
        {
            cityStart: {
                type: String,
                required: true
            },
            dateStart: {
                type: Date,
                required: true
            },
            cityReturn: {
                type: String,
                required: true
            },
            dateReturn: {
                type: Date,
                required: true
            }
        }
    ]
});

const Transport = mongoose.model('Transport', transportSchema);

module.exports = Transport;
