const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  country: String,
  city: String,
  flag: String,
  timestamp: Number,
});

// Prevent model overwrite error in Next.js hot reload
module.exports = mongoose.models.Location || mongoose.model('Location', LocationSchema);