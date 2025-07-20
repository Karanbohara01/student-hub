const User = require('../models/User.js');
const Note = require('../models/Note.js');


const getUserProfile = (req, res) => {
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.university = req.body.university || user.university;
        user.bio = req.body.bio || user.bio;
        if (req.body.supportLinks) {
            user.supportLinks.buyMeACoffee = req.body.supportLinks.buyMeACoffee || user.supportLinks.buyMeACoffee;
            user.supportLinks.github = req.body.supportLinks.github || user.supportLinks.github;
        }
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
const addNoteToFavorites = async (req, res) => {
    try {
        const { noteId } = req.body;
        const user = await User.findById(req.user._id);

        if (user) {
            // Add the noteId to the savedNotes array if it's not already there
            await user.updateOne({ $addToSet: { savedNotes: noteId } });
            res.status(200).json({ message: 'Note added to favorites' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const getFavoriteNotes = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'savedNotes',
            populate: { path: 'postedBy', select: 'name' } // Also get the note's author
        });

        if (user) {
            res.status(200).json(user.savedNotes);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const removeNoteFromFavorites = async (req, res) => {
    try {
        const { noteId } = req.body;
        const user = await User.findById(req.user._id);

        if (user) {
            // Remove the noteId from the savedNotes array
            await user.updateOne({ $pull: { savedNotes: noteId } });
            res.status(200).json({ message: 'Note removed from favorites' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getUserProfile,
    addNoteToFavorites,
    getFavoriteNotes,
    updateUserProfile,
    removeNoteFromFavorites,
};
