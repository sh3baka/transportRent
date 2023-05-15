const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = new express.Router();

router.post('/orders', orderController.createOrder);
router.get('/orders', auth, admin, orderController.getOrders);
router.delete('/orders/:id', auth, orderController.deleteOrder);


module.exports = router;
