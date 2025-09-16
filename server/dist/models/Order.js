"use strict";

// server/models/Order.js
var mongoose = require('mongoose');
var orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project'
  },
  paymentInfo: {
    id: {
      type: String
    },
    // Transaction ID from eSewa
    status: {
      type: String
    },
    // 'Success' or 'Failed'
    gateway: {
      type: String
    },
    // e.g., 'eSewa', 'Khalti', 'Stripe'
    method: {
      type: String
    } // e.g., 'wallet', 'card'
  },
  price: {
    type: Number,
    required: true
  },
  isPaid: {
    type: Boolean,
    required: true,
    "default": false
  },
  paidAt: {
    type: Date
  }
}, {
  timestamps: true
});
var Order = mongoose.model('Order', orderSchema);
module.exports = Order;