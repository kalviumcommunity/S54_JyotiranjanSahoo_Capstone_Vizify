const mongoose = require("mongoose");
const TextSchema = require('./Text')
const ImageSchema = require('./Image')
const ShapeSchema = require('./Shapes')

const SlideElementSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  text: TextSchema,
  image: ImageSchema,
  shape: ShapeSchema,
  pos_size: {
    w: { type: [String, Number] },
    h: { type: [String, Number] },
    x: { type: [String, Number] },
    y: { type: [String, Number] },
  },
});

module.exports = SlideElementSchema;
