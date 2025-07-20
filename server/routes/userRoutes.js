const express = require('express');
const router = express.Router();

const { getUserProfile, updateUserProfile, addNoteToFavorites, getFavoriteNotes, removeNoteFromFavorites } = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js');

// These routes will now work
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/favorites')
    .put(protect, addNoteToFavorites)
    .get(protect, getFavoriteNotes)
    .delete(protect, removeNoteFromFavorites);


module.exports = router;