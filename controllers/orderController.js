const Order = require('../models/order');

const createOrder = async (req, res) => {
    try {
        const order = new Order({
            ...req.body,
            transportId: req.body.transportId,
        });

        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).send({ error: 'Order not found.' });
        }

        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createOrder,
    getOrders,
    deleteOrder,
};

