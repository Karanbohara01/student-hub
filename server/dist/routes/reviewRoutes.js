"use strict";

// const express = require('express');
// const router = express.Router();
// const { createReview } = require('../controllers/reviewController.js');
// const { protect } = require('../middleware/authMiddleware.js');

// //  /api/reviews
// router.route('/').post(protect, createReview);

// module.exports = router;

var express = require('express');
var router = express.Router();
var _require = require('../controllers/reviewController.js'),
  createReview = _require.createReview,
  createNoteReview = _require.createNoteReview;
var _require2 = require('../middleware/authMiddleware.js'),
  protect = _require2.protect;

// This route is for reviewing a SELLER (e.g., after a book transaction)
router.route('/').post(protect, createReview);

// This route is for reviewing a NOTE
router.route('/notes/:id').post(protect, createNoteReview);
module.exports = router;