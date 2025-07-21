
const express = require('express');
const router = express.Router();
const {
  featureNote,
  getAllNotes,
  updateNoteStatus
} = require('../controllers/adminController.js');
const { protect } = require('../middleware/authMiddleware.js');
const { admin } = require('../middleware/adminMiddleware.js');

// GET /api/admin/notes (Get all notes)
router.get('/notes', protect, admin, getAllNotes);

// PUT /api/admin/notes/:id/feature (Feature a note)
router.put('/notes/:id/feature', protect, admin, featureNote);

// PUT /api/admin/notes/:id/status (Approve/Reject a note)
router.put('/notes/:id/status', protect, admin, updateNoteStatus);

module.exports = router;