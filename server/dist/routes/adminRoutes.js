"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/adminController.js'),
  featureNote = _require.featureNote,
  getAllNotes = _require.getAllNotes,
  updateNoteStatus = _require.updateNoteStatus;
var _require2 = require('../middleware/authMiddleware.js'),
  protect = _require2.protect;
var _require3 = require('../middleware/adminMiddleware.js'),
  admin = _require3.admin;

// GET /api/admin/notes (Get all notes)
router.get('/notes', protect, admin, getAllNotes);

// PUT /api/admin/notes/:id/feature (Feature a note)
router.put('/notes/:id/feature', protect, admin, featureNote);

// PUT /api/admin/notes/:id/status (Approve/Reject a note)
router.put('/notes/:id/status', protect, admin, updateNoteStatus);
module.exports = router;