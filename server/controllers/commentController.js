const Comment = require('../models/Comment.js');
const Note = require('../models/Note.js');

// @desc    Create a new comment on a note
// @route   POST /api/notes/:noteId/comments
// @access  Private
const createComment = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const comment = new Comment({
      note: req.params.noteId,
      user: req.user._id,
      text: req.body.text,
    });

    const createdComment = await comment.save();
    res.status(201).json(createdComment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating comment', error: error.message });
  }
};

// @desc    Get all comments for a note
// @route   GET /api/notes/:noteId/comments
// @access  Public
const getCommentsByNoteId = async (req, res) => {
  try {
    const comments = await Comment.find({ note: req.params.noteId })
      .populate('user', 'name profilePicture')
      .sort({ createdAt: 'asc' });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createComment,
  getCommentsByNoteId,
};