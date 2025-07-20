const express = require('express');
const router = express.Router();
const { getConversations, getMessages, findOrCreateConversation, uploadChatFile, } = require('../controllers/chatController.js');
const { protect } = require('../middleware/authMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js'); // <-- Import upload


router.route('/conversations').get(protect, getConversations)
  .post(protect, findOrCreateConversation);
router.route('/conversations/:id').get(protect, getMessages);
router.route('/upload').post(protect, upload.single('chatFile'), uploadChatFile);


module.exports = router;