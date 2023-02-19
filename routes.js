const router = require('express').Router();

const homeContoller = require('./controllers/homeController');
const authController = require('./controllers/authController');
const photoController = require('./controllers/photoController');

router.use(homeContoller);
router.use(authController);
router.use('/photos', photoController);

//TODO: add routes

router.all('*', (req, res) => {
    res.render('home/404');
});

module.exports = router;