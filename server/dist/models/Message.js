"use strict";

var mongoose = require('mongoose');
var messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String
  },
  fileUrl: {
    type: String
  },
  fileType: {
    type: String
  }
}, {
  timestamps: true
});
var Message = mongoose.model('Message', messageSchema);
module.exports = Message;