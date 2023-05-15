const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  transportName: {
    type: String,
    required: true,
  },
  transportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transport',
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
