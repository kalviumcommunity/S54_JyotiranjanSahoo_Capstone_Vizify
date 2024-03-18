const mongoose = require('mongoose')


const GradientSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    direction: String,
    centerX: Number,
    centerY: Number,
    radius: Number,
  });

module.exports = GradientSchema