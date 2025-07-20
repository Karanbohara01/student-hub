const Review = require('../models/Review.js');
const User = require('../models/User.js');
const Note = require('../models/Note.js');

// @desc    Create a new review for a seller
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  const { sellerId, rating, comment } = req.body;

  try {
    // --- For now, we'll keep the logic simple. Later, we'd add a check ---
    // --- to ensure the user actually completed a transaction with the seller. ---

    const seller = await User.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found.' });
    }

    // Create the new review
    const review = new Review({
      user: req.user._id, // The logged-in user writing the review
      seller: sellerId,   // The user being reviewed
      rating: Number(rating),
      comment,
    });
    await review.save();

    // --- Update the seller's overall rating ---
    // 1. Get all reviews for this seller
    const reviews = await Review.find({ seller: sellerId });

    // 2. Calculate the new average rating
    seller.numReviews = reviews.length;
    seller.rating =
      reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await seller.save();

    res.status(201).json({ message: 'Review added successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
const createNoteReview = async (req, res) => {
  console.log('--- Create Note Review Fired ---');
  const { rating, comment } = req.body;
  const noteId = req.params.id;
  const userId = req.user._id;

  console.log(`Attempting to review note: ${noteId} by user: ${userId}`);
  console.log(`Rating: ${rating}, Comment: "${comment}"`);

  try {
    const note = await Note.findById(noteId);
    if (!note) {
      console.log('Error: Note not found.');
      return res.status(404).json({ message: 'Note not found.' });
    }
    console.log('Step 1: Note found successfully.');

    const alreadyReviewed = await Review.findOne({
      user: userId,
      product: noteId,
    });

    if (alreadyReviewed) {
      console.log('Error: User has already reviewed this note.');
      return res.status(400).json({ message: 'You have already reviewed this note.' });
    }
    console.log('Step 2: User has not reviewed this note before. Proceeding.');

    const review = new Review({
      user: userId,
      product: noteId,
      seller: note.postedBy,
      rating: Number(rating),
      comment,
    });
    await review.save();
    console.log('Step 3: New review document saved to database.');

    const reviews = await Review.find({ product: noteId });
    note.numReviews = reviews.length;
    note.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    await note.save();
    console.log(`Step 4: Note's rating updated. New rating: ${note.rating}, Total reviews: ${note.numReviews}`);

    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('--- FATAL ERROR IN createNoteReview ---', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createReview,
  createNoteReview,
};