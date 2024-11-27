const express =require ("express");
const { testUserControllers } = require("../controllers/testController");
//router object
const router=express.Router()
//routes
router.get('/test-user',testUserControllers,)
//exports
module.exports=router