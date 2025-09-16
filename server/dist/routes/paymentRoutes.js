"use strict";

// server/routes/paymentRoutes.js
var express = require('express');
var router = express.Router();
var _require = require('../controllers/paymentController.js'),
  initiateEsewaPayment = _require.initiateEsewaPayment,
  verifyEsewaPayment = _require.verifyEsewaPayment;
var _require2 = require('../middleware/authMiddleware.js'),
  protect = _require2.protect;

// Routes
router.post('/esewa/initiate', protect, initiateEsewaPayment);
router.get('/esewa/success', verifyEsewaPayment);
module.exports = router;