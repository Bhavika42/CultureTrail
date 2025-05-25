const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  category: String,
});

module.exports = mongoose.model('Place', placeSchema);
