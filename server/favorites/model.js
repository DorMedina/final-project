const mongoose = require('mongoose');

const favSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const favorite = mongoose.model('Favorite', favSchema);

module.exports = favorite;
