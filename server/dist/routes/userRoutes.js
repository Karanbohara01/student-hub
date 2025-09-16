"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/userController.js'),
  getUserProfile = _require.getUserProfile,
  updateUserProfile = _require.updateUserProfile,
  addNoteToFavorites = _require.addNoteToFavorites,
  getUserPublicProfile = _require.getUserPublicProfile,
  getFavoriteNotes = _require.getFavoriteNotes,
  removeNoteFromFavorites = _require.removeNoteFromFavorites,
  updateProfilePicture = _require.updateProfilePicture;
var _require2 = require('../middleware/authMiddleware.js'),
  protect = _require2.protect;
var upload = require('../middleware/uploadMiddleware.js');

// These routes will now work
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/favorites').put(protect, addNoteToFavorites).get(protect, getFavoriteNotes)["delete"](protect, removeNoteFromFavorites);
router.get('/:id/profile', getUserPublicProfile);
router.route('/profile/picture').put(protect, upload.single('profilePicture'), updateProfilePicture);
module.exports = router;