const Note = require('../models/Note.js');

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({}).populate('postedBy', 'name email');
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const featureNote = async (req, res) => {
  try {
    const { year, achievement, rank } = req.body;
    const note = await Note.findById(req.params.id);

    if (note) {
      note.isTopperNote = true;
      note.status = 'Approved';
      note.topperDetails = { year, achievement, rank };
      await note.save();
      res.status(200).json({ message: 'Note has been featured and approved.' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- This function was missing ---
const updateNoteStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'Approved' or 'Rejected'
    const note = await Note.findById(req.params.id);
    if (note) {
      note.status = status;
      await note.save();
      res.status(200).json({ message: `Note status updated to ${status}` });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  featureNote,
  getAllNotes,
  updateNoteStatus // <-- Corrected this line
};