const mongoose = require("mongoose");

const ShapeSchema = new mongoose.Schema({
  shapeType: String,
  options: {
    align: String,
    flipH: Boolean,
    fill: {
      color: { type: String, default: "000000" },
      transparency: { type: Number, default: 0, min: 0, max: 100 },
    },
    flipV: Boolean,
    rotate: Number,
    shadow: {
      type: { type: String },
      angle: Number,
      blur: Number,
      color: String,
      offset: Number,
      opacity: Number,
    },
    hyperlink: { url: String, slide: Number },
    rectRadius: Number,
  },
});

module.exports = ShapeSchema;
