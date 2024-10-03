const express=require('express');
const { UserController } = require('../../controllers');
const router=express.Router();

router.use('/',UserController.signup)
module.exports=router;
