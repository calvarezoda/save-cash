// backend/models/Admin.js

const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin'
  },
  totalCommissionsEarned: {
    type: Number,
    default: 0
  },
  notifications: [
    {
      message: String,
      date: {
        type: Date,
        default: Date.now
      },
      read: {
        type: Boolean,
        default: false
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Admin', AdminSchema);