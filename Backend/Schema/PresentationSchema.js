const mongoose = require("mongoose");

const BackgroundSchema = require("./PresenationElementsSchema/BackGroundSchema");
const TextSchema = require("./PresenationElementsSchema/Text")
const ImageSchema = require("./PresenationElementsSchema/Image")

const SlideSchema = new mongoose.Schema({
  elements: [mongoose.Schema.Types.Mixed],
});

const PresentationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    presentation: {
      background: {
        type: BackgroundSchema,
        required: true,
      },
      slides: [SlideSchema],
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

const PresentationModel = mongoose.model(
  "presentationdatas",
  PresentationSchema
);

module.exports = PresentationModel;
