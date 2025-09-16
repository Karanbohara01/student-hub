"use strict";

// const express = require('express');
// const router = express.Router();
// const { createBookListing, getBookListings, updateBookListing, deleteBookListing,
//     getBookListingById, getMyBookListings, updateListingStatus } = require('../controllers/bookController.js');
// const { protect } = require('../middleware/authMiddleware.js');
// const upload = require('../middleware/uploadMiddleware.js');

// router
//     .route('/')
//     .post(protect, upload.single('coverImage'), createBookListing)
//     .get(getBookListings);
// router.route('/my-listings').get(protect, getMyBookListings);

// router.route('/:id').get(getBookListingById)
//     .put(protect, updateBookListing)
//     .delete(protect, deleteBookListing);
// router.route('/:id/status').put(protect, updateListingStatus);

// module.exports = router;

var express = require('express');
var router = express.Router();

// Controllers
var _require = require('../controllers/bookController.js'),
  createBookListing = _require.createBookListing,
  getBookListings = _require.getBookListings,
  getBookListingById = _require.getBookListingById,
  updateBookListing = _require.updateBookListing,
  deleteBookListing = _require.deleteBookListing,
  getMyBookListings = _require.getMyBookListings,
  updateListingStatus = _require.updateListingStatus;

// Middleware
var _require2 = require('../middleware/authMiddleware.js'),
  protect = _require2.protect;
var upload = require('../middleware/uploadMiddleware.js');

// @route   POST /api/books/
// @desc    Create a new book listing (requires auth, image upload)
// @route   GET /api/books/
// @desc    Get all book listings
router.route('/').post(protect, upload.single('coverImage'), createBookListing).get(getBookListings);

// @route   GET /api/books/my-listings
// @desc    Get current user's book listings
router.route('/my-listings').get(protect, getMyBookListings);

// @route   GET /api/books/:id
// @desc    Get a book listing by ID
// @route   PUT /api/books/:id
// @desc    Update a book listing (auth required)
// @route   DELETE /api/books/:id
// @desc    Delete a book listing (auth required)
router.route('/:id').get(getBookListingById).put(protect, upload.single('coverImage'), updateBookListing) // if updating image too
["delete"](protect, deleteBookListing);

// @route   PUT /api/books/:id/status
// @desc    Update listing status (e.g., sold, active, etc.)
router.route('/:id/status').put(protect, updateListingStatus);
module.exports = router;