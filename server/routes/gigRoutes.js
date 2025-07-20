const express = require('express');
const router = express.Router();
const {
    createGig,
    getGigs,
    getGigById,
    updateGig,
    deleteGig,
    applyForGig,
    approveGigApplicant,
} = require('../controllers/gigController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Routes for /api/gigs
router.route('/')
    .get(getGigs)
    .post(protect, createGig);

// Route for /api/gigs/:id/accept

// Routes for /api/gigs/:id
router.route('/:id')
    .get(getGigById)
    .put(protect, updateGig)
    .delete(protect, deleteGig);

router.route('/:id/apply').post(protect, applyForGig);

// New route for approving an applicant
router.route('/:id/approve').put(protect, approveGigApplicant);


module.exports = router;