const express=require('express');
const router=express.Router();
const home_controller=require('../controllers/home_controller');

router.get('/',home_controller.home);
router.use('/users',require('./users'));

//to further forward to any route use
// router.use('/routename',require('./routefilepath'));


module.exports=router;