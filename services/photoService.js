const Photo = require('../models/Photo');

exports.getAll = () => Photo.find({});

exports.getOne = (photoId) => Photo.findById(photoId);

exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData);

exports.create = (ownerId, photoData) => Photo.create({ownerId, ...photoData});

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);