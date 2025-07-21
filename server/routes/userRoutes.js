const express = require('express');
const router = express.Router();

const { getUserProfile, updateUserProfile, addNoteToFavorites, getUserPublicProfile, getFavoriteNotes, removeNoteFromFavorites, updateProfilePicture } = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');


// These routes will now work
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/favorites')
    .put(protect, addNoteToFavorites)
    .get(protect, getFavoriteNotes)
    .delete(protect, removeNoteFromFavorites);
router.get('/:id/profile', getUserPublicProfile);
router.route('/profile/picture').put(protect, upload.single('profilePicture'), updateProfilePicture);



module.exports = router;