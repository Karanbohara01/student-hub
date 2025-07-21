// server/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();

const {
  initiateEsewaPayment,
  verifyEsewaPayment,
} = require('../controllers/paymentController.js');

const { protect } = require('../middleware/authMiddleware.js');

// Routes
router.post('/esewa/initiate', protect, initiateEsewaPayment);
router.get('/esewa/success', verifyEsewaPayment);

module.exports = router;
