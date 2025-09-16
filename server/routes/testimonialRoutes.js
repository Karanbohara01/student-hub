const express = require('express');
const router = express.Router();
const { createTestimonial, getApprovedTestimonials } = require('../controllers/testimonialController.js');

router.route('/')
  .post(createTestimonial)
  .get(getApprovedTestimonials);

module.exports = router;