const express = require('express');
const transportController = require('../controllers/transportController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = new express.Router();

router.post('/transports', auth, admin, transportController.createTransport);
router.get('/transports', transportController.getTransports);
router.post('/search', transportController.search);
router.patch('/transports/:id/reserve', transportController.reserveTransport);
router.delete('/transports/:id', auth, admin, transportController.deleteTransport);
router.put('/transports/:id', auth, admin, transportController.updateTransport);
router.patch('/transports/:id/removeReservation', transportController.removeReservation);




module.exports = router;
