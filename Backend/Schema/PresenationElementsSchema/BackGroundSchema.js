const mongoose = require('mongoose')

const BackgroundSchema = new mongoose.Schema({
  color: {
    type: String,
    match: /^[0-9A-Fa-f]{6}$/,
    required: function () {
      return !this.image;
    }
  },
  transparency: {
    type: Number,
    min: 0,
    max: 100,
    required: function () {
      return !!this.color;
    }
  },
  // Fields for the second option
  image: {
    type: String,
    required: function () {
      return !this.color;
    }
  },
  style: {
    type: String,
    enum: [
      "3d-model",
      "analog-film",
      "anime",
      "cinematic",
      "comic-book",
      "digital-art",
      "enhance",
      "fantasy-art",
      "isometric",
      "line-art",
      "low-poly",
      "modeling-compound",
      "neon-punk",
      "origami",
      "photographic",
      "pixel-art",
      "tile-texture"
    ],
    required: function () {
      return !!this.image;
    }
  }
  });

module.exports = BackgroundSchema