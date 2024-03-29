const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const photoService = require('../services/photoService');

//----------------------------------------------------------------------------------
router.get('/catalog', async (req, res) => {
    const photo = await photoService.getAll().lean();

    res.render('photo/catalog', {photo});
});
//----------------------------------------------------------------------------------
router.get('/:photoId/details', async (req, res) => {
    const photoId = req.params.photoId;

    try {
        const photo = await photoService
            .getOne(photoId)
            .populate('ownerId')
            .populate('commentList.userId')
            .lean()
            //.populate({
            //    path: 'commentList',
            //    populate: {
            //        path: 'userId'
            //    }})
            //    .lean();
            
        let isUser = true;
        let isOwner = false;
    
        if(!req.user){
            isUser = false;
        } else {
            isOwner = photo.ownerId._id == req.user._id;
        }
    
        res.render('photo/details', {...photo, isOwner, isUser});
        
    } catch (error) {
        console.log('here')
        res.redirect('/404');
    }
});

//----------------------------------------------------------------------------------
router.post('/:photoId/comment', async (req, res) => {
    const photoId = req.params.photoId;
    const userId = req.user._id;
    const comment = req.body.comment;

    try {
        await photoService.addComment(photoId, userId, comment);
    } catch (error) {
        console.log(error);
    }

    res.redirect(`/photos/${photoId}/details`);

});

//----------------------------------------------------------------------------------
router.get('/:photoId/edit', isAuth,  async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await photoService.getOne(photoId).lean();

    if (photo._id == req.user._id){
        res.render('photo/edit', {...photo});
    }else{
        res.redirect('/404');
    }

});

router.post('/:photoId/edit', isAuth,  async (req, res) => {
    const photoId = req.params.photoId;
    const photoData = req.body;

    try {
        await photoService.edit(photoId, photoData);
        res.redirect(`/photos/${photoId}/details`);
        
    } catch (error) {
        res.render('photo/edit', {...photoData,  error: getErrorMessage(error)});
    }

});


//----------------------------------------------------------------------------------
router.get('/:photoId/delete', isAuth,  async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await photoService.getOne(photoId).populate('ownerId').lean();
    
    const isOwner = photo.ownerId._id == req.user._id;

    if (isOwner){
        await photoService.delete(photoId);
        res.redirect('/photos/catalog')
    } else {
        res.redirect('/404');
    }

});

//----------------------------------------------------------------------------------
router.get('/create', isAuth, (req, res) => {
    res.render('photo/create');
});

router.post('/create', async (req, res) => {
    const photoData = req.body;
    
    try {
        await photoService.create(req.user._id, photoData);
        res.redirect('/photos/catalog');  
    } catch (error) {
        return  res.render('photo/create', { error: getErrorMessage(error)});
    }
    
});

//----------------------------------------------------------------------------------





module.exports = router;