const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    // The user who WROTE the review
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // The user who is BEING REVIEWED (the seller)
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    // You can link a review to a specific product if you want
    product: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      // refPath: 'productType' // Could be 'Project' or 'Book'
    }
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;