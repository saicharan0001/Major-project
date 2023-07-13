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
router.get('/profile/:id',passport.checkAuthentication,users_controller.profile);
router.post('/update/:id',passport.checkAuthentication,users_controller.update);
router.use('/friends',require('./friends'));
//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),users_controller.createSession);

//requesting google
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
//google sending deatails to callbackurl (http://localshost:8000/users/auth/google/callback)
router.get('/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect:'/users/sign-in'}
),users_controller.createSession);


module.exports=router;