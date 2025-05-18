// backend/models/UserProfile.js

const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  searchHistory: [
    {
      query: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  preferredCategories: [String],
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);