const express = require('express');
const router = express.Router();
const { featureNote, getAllNotes } = require('../controllers/adminController.js');
const { protect } = require('../middleware/authMiddleware.js');
const { admin } = require('../middleware/adminMiddleware.js');
router.get('/notes', protect, admin, getAllNotes);


// This route is protected and can only be accessed by admins
router.put('/notes/:id/feature', protect, admin, featureNote);

module.exports = router;