"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/noteController.js'),
  createNote = _require.createNote,
  getNotes = _require.getNotes,
  getNoteById = _require.getNoteById,
  getTopperNotes = _require.getTopperNotes;
var _require2 = require('../middleware/authMiddleware.js'),
  protect = _require2.protect;
var upload = require('../middleware/uploadMiddleware.js');
var _require3 = require('../controllers/commentController.js'),
  createComment = _require3.createComment,
  getCommentsByNoteId = _require3.getCommentsByNoteId;

// POST /api/notes
router.route('/').post(protect, upload.single('noteFile'), createNote).get(getNotes);
router.route('/toppers').get(getTopperNotes);
router.route('/:id').get(getNoteById);
// --- ADD COMMENT ROUTES ---
router.route('/:noteId/comments').post(protect, createComment).get(getCommentsByNoteId);
module.exports = router;