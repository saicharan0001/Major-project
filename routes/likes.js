const express = require('express');
const router = express.Router();
const likes_Controller = require('../controllers/likes_controller');

router.post('/toggle', likes_Controller.toggleLike);

module.exports = router;