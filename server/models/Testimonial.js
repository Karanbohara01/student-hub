const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Approved'],
    default: 'Pending',
  },
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
module.exports = Testimonial;