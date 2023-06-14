const users_controller=require('../controllers/users_controller');
const express=require('express');
const router=express.Router();

router.get('/',users_controller.users);

module.exports=router;