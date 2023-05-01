const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/users', userController.createUser);
router.post('/users/login', userController.loginUser);
router.get('/users/me', auth, userController.getProfile);
router.post('/users/logout', auth, userController.logoutUser);

module.exports = router;
