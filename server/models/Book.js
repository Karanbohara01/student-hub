const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        isbn: {
            type: String,
            trim: true,
        },
        condition: {
            type: String,
            required: true,
            enum: ['New', 'Like New', 'Good', 'Acceptable'],
        },
        listingType: {
            type: String,
            required: true,
            enum: ['Sell', 'Exchange', 'Free'], // <-- Updated from 'Rent'
        },
        price: { // For 'Sell' type
            type: Number,
            default: 0,
        },
        exchangeDetails: { // <-- New field for 'Exchange' type
            type: String,
            trim: true,
        },
        coverImage: {
            type: String,
            default: '/uploads/default-book-cover.png',
        },
        status: {
            type: String,
            required: true,
            enum: ['Available', 'Sold', 'Exchanged'], // <-- Updated from 'Rented Out'
            default: 'Available',
        },
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;