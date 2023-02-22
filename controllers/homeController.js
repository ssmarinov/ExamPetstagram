const User = require('../models/User');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home')
});

router.get('/profile', async (req, res) => {
    const user = await User.findById(req.user._id).populate('myPhotoId').lean();
    const photoCount = user.myPhotoId.length;
    res.render('home/profile', {...user, photoCount})
});

module.exports = router;