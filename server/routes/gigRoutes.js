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
    rejectGigApplicant,
} = require('../controllers/gigController.js');
const { protect } = require('../middleware/authMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');


// Routes for /api/gigs
router.route('/')
    .post(protect, upload.single('gigFile'), createGig) // <-- Add middleware
    .get(getGigs);
router.route('/')



// Route for /api/gigs/:id/accept

// Routes for /api/gigs/:id
router.route('/:id')
    .get(getGigById)
    .put(protect, updateGig)
    .delete(protect, deleteGig);

router.route('/:id/apply').post(protect, applyForGig);

// New route for approving an applicant
router.route('/:id/approve').put(protect, approveGigApplicant);
router.put('/:id/reject', protect, rejectGigApplicant);



module.exports = router;