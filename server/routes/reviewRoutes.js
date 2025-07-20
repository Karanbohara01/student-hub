// const express = require('express');
// const router = express.Router();
// const { createReview } = require('../controllers/reviewController.js');
// const { protect } = require('../middleware/authMiddleware.js');

// //  /api/reviews
// router.route('/').post(protect, createReview);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { createReview, createNoteReview } = require('../controllers/reviewController.js');
const { protect } = require('../middleware/authMiddleware.js');

// This route is for reviewing a SELLER (e.g., after a book transaction)
router.route('/').post(protect, createReview);

// This route is for reviewing a NOTE
router.route('/notes/:id').post(protect, createNoteReview);

module.exports = router;