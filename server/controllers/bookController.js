const Book = require('../models/Book.js');


const createBookListing = async (req, res) => {
    try {
        const {
            title,
            author,
            isbn,
            condition,
            listingType,
            price,
            exchangeDetails,
            coverImage,
        } = req.body;

        const book = new Book({
            user: req.user._id, // from protect middleware
            title,
            author,
            isbn,
            condition,
            listingType,
            price,
            exchangeDetails,
            coverImage: req.file ? `/uploads/${req.file.filename}` : undefined,
        });

        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(400).json({ message: 'Error creating book listing', error: error.message });
    }
};


const getBookListings = async (req, res) => {
    try {
        const { searchTerm, condition, listingType } = req.query;

        let filter = {};

        // Add search term filter (searches title and author)
        if (searchTerm) {
            filter.$or = [
                { title: { $regex: searchTerm, $options: 'i' } },
                { author: { $regex: searchTerm, $options: 'i' } },
            ];
        }

        // Add condition filter
        if (condition) {
            filter.condition = condition;
        }

        // Add listing type filter
        if (listingType) {
            filter.listingType = listingType;
        }

        const books = await Book.find(filter).populate('user', 'name rating numReviews');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


const getBookListingById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate(
            'user',
            'name profilePicture'
        );
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book listing not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const updateBookListing = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            // Check if the logged-in user is the owner
            if (book.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            // Update fields from request body
            book.title = req.body.title || book.title;
            book.author = req.body.author || book.author;
            book.condition = req.body.condition || book.condition;
            book.listingType = req.body.listingType || book.listingType;
            book.price = req.body.price ?? book.price;
            book.exchangeDetails = req.body.exchangeDetails || book.exchangeDetails;
            book.status = req.body.status || book.status;

            const updatedBook = await book.save();
            res.status(200).json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book listing not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const deleteBookListing = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            if (book.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            await book.deleteOne();
            res.status(200).json({ message: 'Book listing removed' });
        } else {
            res.status(404).json({ message: 'Book listing not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const getMyBookListings = async (req, res) => {
    try {
        const books = await Book.find({ user: req.user._id });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const updateListingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const book = await Book.findById(req.params.id);

        if (book) {
            if (book.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            book.status = status;
            await book.save();

            // --- NEW REAL-TIME LOGIC ---
            // Broadcast the update to all connected clients
            req.io.emit('book_status_updated', {
                bookId: book._id,
                newStatus: book.status,
            });
            // --- END OF NEW LOGIC ---

            res.status(200).json({ message: `Book status updated to ${status}` });
        } else {
            res.status(404).json({ message: 'Book listing not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};





module.exports = {
    createBookListing,
    getBookListings,
    getBookListingById,
    updateBookListing,
    deleteBookListing,
    getMyBookListings,
    updateListingStatus,
};
