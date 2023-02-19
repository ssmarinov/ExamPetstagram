const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const config = require('../config/config');

exports.findByUsername = (username) => User.findOne({username});
//exports.findByEmail = (email) => User.findOne({email});

exports.register = async (username, email, password, repeatPassword) => {
    if (password !== repeatPassword){
        throw new Error ('Password mismatch');
    }

    //check for user exist
    const existingUser = await this.findByUsername(username);
    if (existingUser){
        throw new Error('User already exist');
    };


    //TODO validate Password

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({username, email, password: hashedPassword});

    return this.login(username, password);         
};

exports.login = async (username, password) => {

    const user = await this.findByUsername(username);

    console.log(user)
    
    //User exist check
    if (!user){
        throw new Error ('Invalid username or password!');
    }

    //Valid Password check
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid){
        throw new Error ('Invalid username or password!!!');
    }

    //Generate token
    const payload = {
        _id: user._id,
        username,
        email: user.email
    }
    const token = await jwt.sign(payload, config.JWT_SECRET);

    return token;
}