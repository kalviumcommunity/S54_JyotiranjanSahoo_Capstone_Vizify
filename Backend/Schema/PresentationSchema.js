const mongoose = require("mongoose");

const BackgroundSchema = require('./PresenationElementsSchema/BackGroundSchema')
const SlideElementSchema = require('./PresenationElementsSchema/SlideElementsSchema')


const SlideSchema = new mongoose.Schema({
  background: {
    type: BackgroundSchema,
  },
  elements: [SlideElementSchema],
});

const PresentationSchema = new mongoose.Schema({
  slides: [SlideSchema],
  createdBy: String
},{
  timestamps: true
});

const PresentationModel = mongoose.model("presentations", PresentationSchema);

module.exports = PresentationModel;
