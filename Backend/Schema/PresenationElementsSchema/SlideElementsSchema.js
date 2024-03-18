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
    w: { type: Number },
    h: { type: Number },
    x: { type: Number },
    y: { type: Number },
  },
});

module.exports = SlideElementSchema;
