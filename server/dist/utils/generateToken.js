"use strict";

var jwt = require('jsonwebtoken');
var generateToken = function generateToken(res, userId) {
  var token = jwt.sign({
    userId: userId
  }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    // Use secure cookies in production
    sameSite: 'strict',
    // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });
};
module.exports = generateToken;