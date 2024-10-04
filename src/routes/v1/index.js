const express = require('express');
const userRouter=require('./user-routes')
const { InfoController } = require('../../controllers');
const router = express.Router();

router.get('/info', InfoController.info);
router.use('/user',userRouter)

module.exports = router;