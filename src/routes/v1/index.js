const express = require('express');
const userRouter=require('./user-routes')
const { InfoController } = require('../../controllers');
const router = express.Router();

router.get('/info', InfoController.info);
router.post('/signup',userRouter)

module.exports = router;