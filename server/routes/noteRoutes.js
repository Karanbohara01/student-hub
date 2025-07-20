const express = require('express');
const router = express.Router();
const { createNote, getNotes, getNoteById, getTopperNotes } = require('../controllers/noteController.js');
const { protect } = require('../middleware/authMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');
const {
  createComment,
  getCommentsByNoteId,
} = require('../controllers/commentController.js');

// POST /api/notes
router.route('/').post(protect, upload.single('noteFile'), createNote)
  .get(getNotes);
router.route('/toppers').get(getTopperNotes);

router.route('/:id').get(getNoteById);
// --- ADD COMMENT ROUTES ---
router.route('/:noteId/comments')
  .post(protect, createComment)
  .get(getCommentsByNoteId);



module.exports = router;