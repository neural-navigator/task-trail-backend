const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create-user', userController.createUser);
router.post('/verify-user', userController.verifyUser)

module.exports = router;