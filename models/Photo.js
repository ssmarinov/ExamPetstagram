const mongoose = require('mongoose');
const User = require('./User');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: 2
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: /^https?:\/\//,
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: 1,
        max: 100,
    },
    description: {
        type:String,
        required: [true, 'Description is required'],
        minLength: 5,
        maxLength: 50,
 
    },
    location: {
        type: String,
        required: [true, 'Location is requied'],
        minLength: 5,
        mixLength: 50
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },                                      //TODO commentList
    commentList: [{
            userId: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
            comment: {
                type: String
            }
        }],
});



const Photo  = mongoose.model('Photo', photoSchema);

module.exports = Photo;