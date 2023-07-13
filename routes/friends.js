const express = require('express');
const router = express.Router();
const friends_controller = require('../controllers/friends_controller');

router.get('/',friends_controller.togglefriends);
module.exports = router;