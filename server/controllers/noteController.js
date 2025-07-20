

const Note = require('../models/Note.js');

// @desc    Create a new note (user upload)
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res) => {
  try {
    // Log incoming data for debugging
    console.log('Incoming note data:', req.body);
    console.log('Incoming file:', req.file);

    const {
      title,
      description,
      university,
      faculty,
      program,
      semester,
      subject,
      tags,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a note file.' });
    }

    const note = new Note({
      postedBy: req.user._id,
      uploaderType: 'User', // Set by default for user uploads
      status: 'Pending',   // All user uploads are pending review
      filePath: `/uploads/${req.file.filename}`,
      title,
      description,
      university,
      faculty,
      program,
      semester,
      subject,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    console.error('Error in createNote:', error);
    res.status(400).json({ message: 'Error creating note', error: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const { university, faculty, program, semester, subject, searchTerm } = req.query;

    let filter = { status: "Approved" }; // Only show approved notes

    if (university) filter.university = university;
    if (faculty) filter.faculty = faculty;
    if (program) filter.program = program;
    if (semester) filter.semester = semester;
    if (subject) filter.subject = subject;

    if (searchTerm) {
      filter.title = { $regex: searchTerm, $options: 'i' };
    }

    const notes = await Note.find(filter).populate('postedBy', 'name');
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('postedBy', 'name');
    if (note && note.status === 'Approved') {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: 'Note not found or not approved.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
const getTopperNotes = async (req, res) => {
  try {
    const topperNotes = await Note.find({ isTopperNote: true, status: 'Approved' })
      .populate('postedBy', 'name');
    res.status(200).json(topperNotes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}


module.exports = {
  createNote,
  getNotes,
  getNoteById,
  getTopperNotes,
};