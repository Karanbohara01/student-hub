"use strict";

var mongoose = require('mongoose');
var articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  articleType: {
    type: String,
    required: true,
    "enum": ['Notice', 'Routine', 'News', 'Scholarship']
  },
  university: {
    type: String,
    required: true
  },
  faculty: {
    type: String
  },
  sourceUrl: {
    type: String,
    trim: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // This should be an admin user
  }
}, {
  timestamps: true
});
var Article = mongoose.model('Article', articleSchema);
module.exports = Article;