const jwt = require('jsonwebtoken');
const util = require('util');

//Convert jwt callback function to promise
exports.sign = util.promisify(jwt.sign);
exports.verify = util.promisify(jwt.verify);
exports.decode =util.promisify(jwt.decode);