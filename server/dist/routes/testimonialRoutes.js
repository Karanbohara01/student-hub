"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/testimonialController.js'),
  createTestimonial = _require.createTestimonial,
  getApprovedTestimonials = _require.getApprovedTestimonials;
router.route('/').post(createTestimonial).get(getApprovedTestimonials);
module.exports = router;