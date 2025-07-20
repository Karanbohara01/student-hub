const express = require('express');
const router = express.Router();
const { createBookListing, getBookListings, updateBookListing, deleteBookListing,
    getBookListingById, getMyBookListings, updateListingStatus } = require('../controllers/bookController.js');
const { protect } = require('../middleware/authMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');


router
    .route('/')
    .post(protect, upload.single('coverImage'), createBookListing)
    .get(getBookListings);
router.route('/my-listings').get(protect, getMyBookListings); // <-- Add this


router.route('/:id').get(getBookListingById)
    .put(protect, updateBookListing)
    .delete(protect, deleteBookListing);
router.route('/:id/status').put(protect, updateListingStatus);

module.exports = router;