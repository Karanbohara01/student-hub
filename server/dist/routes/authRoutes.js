"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/authController.js'),
  registerUser = _require.registerUser,
  loginUser = _require.loginUser,
  verifyEmail = _require.verifyEmail,
  forgotPassword = _require.forgotPassword,
  resetPassword = _require.resetPassword;
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify-email/:token', verifyEmail); // <-- Add this route
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
module.exports = router;