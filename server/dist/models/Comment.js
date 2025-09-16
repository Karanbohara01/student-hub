"use strict";

var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
  note: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Note'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;