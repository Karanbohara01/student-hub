const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    filePath: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },

    // --- NEW FIELDS for the "Give-to-Get" System ---
    uploaderType: {
      type: String,
      required: true,
      enum: ['Admin', 'User'],
      default: 'User',
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    isTopperNote: {
      type: Boolean,
      default: false,
    },
    topperDetails: {
      year: { type: String }, // e.g., "2024"
      achievement: { type: String, default: '' },
      // e.g., "IOE Pulchowk Topper" or "Lok Sewa Section Officer Rank 1"
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    // --- Categorization Fields ---
    level: { type: String, required: false },
    grade: { type: String },
    university: { type: String },
    faculty: { type: String },
    semester: { type: String },
    subject: { type: String, required: true },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;