const users_controller=require('../controllers/users_controller');
const express=require('express');
const router=express.Router();

router.get('/',users_controller.users);
router.get('/sign-up',users_controller.signUp);
router.get('/sign-in',users_controller.signIn);
router.post('/create',users_controller.create);
router.post('/create-session',users_controller.createSession);
module.exports=router;