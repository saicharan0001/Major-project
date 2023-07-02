const users_controller=require('../controllers/users_controller');
const express=require('express');
const router=express.Router();
const passport=require('passport');
const posts_controller = require('../controllers/posts_controller');

router.get('/',users_controller.users);
router.get('/sign-up',users_controller.signUp);
router.get('/sign-in',users_controller.signIn);
router.post('/create',users_controller.create);
router.get('/sign-out',users_controller.destroySession);
router.get('/profile',passport.checkAuthentication,users_controller.profile);
//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),users_controller.createSession);



module.exports=router;