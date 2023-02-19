const router = require('express').Router();

const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');



router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async  (req, res) => {
    const {username, password} = req.body;

    try {
        const token = await authService.login(username, password);
        
        res.cookie('authCookie', token);         //create cookie
        res.redirect('/');

    } catch (error){
        return res.status(404).render('auth/login', { error: getErrorMessage(error)}) ;
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register')
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;
    
    //TODO:register and login automaticaly 
    try {
        const token = await authService.register(username, email, password, repeatPassword);

        res.cookie('authCookie', token);         //create cookie
        res.redirect('/');

    } catch (error){
        res.status(400).render('auth/register', { error: getErrorMessage(error)});
    }

});

//isAuth - only autorizated user have access to logout
router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('authCookie');
    res.redirect('/');
})


module.exports = router;