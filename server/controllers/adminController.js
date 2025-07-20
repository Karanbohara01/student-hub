const Note = require('../models/Note.js');
const featureNote = async (req, res) => {
  try {
    const { year, university, faculty, program, achievement, rank } = req.body;
    const note = await Note.findById(req.params.id);

    if (note) {
      note.isTopperNote = true;
      note.topperDetails = {
        year,
        university,
        faculty,
        program,
        achievement,
        rank,
      };
      await note.save();
      res.status(200).json({ message: 'Note has been featured successfully.' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({}).populate('postedBy', 'name email');
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { featureNote, getAllNotes };