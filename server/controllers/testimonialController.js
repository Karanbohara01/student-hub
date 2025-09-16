const Testimonial = require('../models/Testimonial.js');

const createTestimonial = async (req, res) => {
  try {
    const { name, college, message } = req.body;
    const testimonial = new Testimonial({ name, college, message });
    await testimonial.save();
    res.status(201).json({ message: 'Thank you! Your review has been submitted for approval.' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting review.' });
  }
};

const getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 'Approved' });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server Error.' });
  }
};

module.exports = { createTestimonial, getApprovedTestimonials };