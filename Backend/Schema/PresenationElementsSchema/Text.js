const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: {
    color: { type: String, default: "000000" },
    align: { type: String, default: "left" },
    bold: { type: Boolean, default: false },
    italic: { type: Boolean, default: false },
    underline: { type: Boolean, default: false },
    bullet: { type: Boolean, default: false },
    fill: String,
    fontSize: { type: Number, default: 11 },
    charSpacing: Number,
    lineSpacing: Number,
    breakLine: { type: Boolean, default: false },
    hyperlink: {url:String,slide:Number},
    shadow: {
      type: { type: String },
      angle: Number,
      blur: Number,
      color: String,
      offset: Number,
      opacity: Number,
    },
    glow: {
      size: { type: Number, required: true },
      opacity: { type: Number, required: true },
      color: { type: String, required: true },
    },
    line: {
      width: Number,
      color: String,
    },
    outline: {
      size: Number,
      color: String,
    },
  },
});

module.exports = TextSchema