const express = require('express');
const router = express.Router();
const passport = require('passport');

const friendshipController = require('../controllers/friendships_controller');

router.get('/togglefriend', passport.checkAuthentication, friendshipController.toggleFriend);
router.get('/getstatus', passport.checkAuthentication, friendshipController.getStatus);

module.exports = router;