"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/chatController.js'),
  getConversations = _require.getConversations,
  getMessages = _require.getMessages,
  findOrCreateConversation = _require.findOrCreateConversation,
  uploadChatFile = _require.uploadChatFile;
var _require2 = require('../middleware/authMiddleware.js'),
  protect = _require2.protect;
var upload = require('../middleware/uploadMiddleware.js'); // <-- Import upload

router.route('/conversations').get(protect, getConversations).post(protect, findOrCreateConversation);
router.route('/conversations/:id').get(protect, getMessages);
router.route('/upload').post(protect, upload.single('chatFile'), uploadChatFile);
module.exports = router;