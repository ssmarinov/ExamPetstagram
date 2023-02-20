const Photo = require('../models/Photo');
const User = require('../models/User');

exports.getAll = () => Photo.find({});

exports.getOne = (photoId) => Photo.findById(photoId);

exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData, {runValidators: true});

exports.create = async (ownerId, photoData) => {
    const newPhoto = await Photo.create({ownerId, ...photoData});
    await User.findByIdAndUpdate(ownerId, { myPhotoId: newPhoto._id});
};

exports.addComment = async (photoId, userId, comment) => {
    const photo = await Photo.findById(photoId);
    photo.commentList.push({userId, comment});
    await photo.save();
}

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);