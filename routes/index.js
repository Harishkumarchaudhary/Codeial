const express = require('express');

const router = express.Router();

console.log('Router loaded');
const homeController = require('../controllers/home_controller');
const { route } = require('./users');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));
router.use('/friendships', require('./friendships'));

router.use('/api', require('./api'));

//for any other routes, access from here
//routes.use('/route', requier('routeFileName'));

module.exports = router;