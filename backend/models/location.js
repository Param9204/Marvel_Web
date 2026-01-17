const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  country: String,
  city: String,
  flag: String,
  timestamp: Number,
});

module.exports = mongoose.model('Location', LocationSchema);