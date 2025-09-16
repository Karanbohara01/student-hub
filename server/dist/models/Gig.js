"use strict";

var mongoose = require('mongoose');
var gigSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  filePath: {
    type: String // To store the path of the uploaded PDF
  },
  subject: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  // --- UPDATED & NEW FIELDS ---
  applicants: [
  // An array to store users who applied
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    required: true,
    "enum": ['Open', 'Pending Approval', 'Booked', 'Completed', 'Cancelled'],
    // <-- Updated statuses
    "default": 'Open'
  }
}, {
  timestamps: true
});
var Gig = mongoose.model('Gig', gigSchema);
module.exports = Gig;