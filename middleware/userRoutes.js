const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');
const authenticate = require('../middleware/jwtValidator')

router.post('/create-user', userController.createUser);
router.post('/verify-user', userController.verifyUser);
router.post('/create-task', authenticate, taskController)

module.exports = router;