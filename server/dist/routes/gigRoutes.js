"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/gigController.js'),
  createGig = _require.createGig,
  getGigs = _require.getGigs,
  getGigById = _require.getGigById,
  updateGig = _require.updateGig,
  deleteGig = _require.deleteGig,
  applyForGig = _require.applyForGig,
  approveGigApplicant = _require.approveGigApplicant,
  rejectGigApplicant = _require.rejectGigApplicant;
var _require2 = require('../middleware/authMiddleware.js'),
  protect = _require2.protect;
var upload = require('../middleware/uploadMiddleware.js');

// Routes for /api/gigs
router.route('/').post(protect, upload.single('gigFile'), createGig) // <-- Add middleware
.get(getGigs);
router.route('/');

// Route for /api/gigs/:id/accept

// Routes for /api/gigs/:id
router.route('/:id').get(getGigById).put(protect, updateGig)["delete"](protect, deleteGig);
router.route('/:id/apply').post(protect, applyForGig);

// New route for approving an applicant
router.route('/:id/approve').put(protect, approveGigApplicant);
router.put('/:id/reject', protect, rejectGigApplicant);
module.exports = router;