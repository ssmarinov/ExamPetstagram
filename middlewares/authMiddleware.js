const jwt = require('../lib/jsonwebtoken');
const config = require('../config/config');


exports.authentication = async (req, res, next) => {
    const token = req.cookies['authCookie'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, config.JWT_SECRET);
            req.user = decodedToken;
            res.locals.isAuthenticated = true;
            res.locals.user = decodedToken;   

        } catch(err){
            res.clearCookie('authCookie');
            return res.status(401).render('home/404');
        }
    }

    next();
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }

    next();
};