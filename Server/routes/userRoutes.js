const express = require("express");
const { getUserController, updateUserController } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router(); // Added parentheses here

// Get user
router.get("/getUser",authMiddleware,   getUserController);
//update user
router.put('/updateUser',authMiddleware,updateUserController);

module.exports = router;
