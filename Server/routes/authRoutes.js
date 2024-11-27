const express = require('express');
const { registerController, loginController } = require('../controllers/authController');
const router = express.Router();

// Register Route||post
router.post('/register', registerController);
//login route||post
router.post('/login',loginController);


module.exports = router;


