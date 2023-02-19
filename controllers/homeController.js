const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home')
});

router.get('/profile', (req, res) => {
    
    const user = req.body;
    res.render('home/profile', {...user})
});



module.exports = router;