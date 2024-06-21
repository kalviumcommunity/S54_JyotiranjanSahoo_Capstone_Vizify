const mongoose = require('mongoose')


const Image = new mongoose.Schema({
    path: {type: String,required: true,match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Please enter a valid URL']},
    altText: String,
    flipH: Boolean,
    flipV: Boolean,
    hyperlink: {url:String,slide:Number},
    rotate: Number,
    rounding: Boolean,
    transparency: Number,
    sizing: {
        type: {type:String},
        w: Number,
        h: Number,
        x: Number,
        y: Number,
    },
    shadow: {
        type: { type: String },
        angle: Number,
        blur: Number,
        color: String,
        offset: Number,
        opacity: Number,
      },
})
const pos_size = new mongoose.Schema({
  x: {
    type: String,
    validate: {
      validator: function(value) {
        return /^(100|[1-9]?[0-9])%$/.test(value);
      }
    },
    default: "1%",
    required: true
  },
  y: {
    type: String,
    validate: {
      validator: function(value) {
        return /^(100|[1-9]?[0-9])%$/.test(value);
      }
    },
    default: "1%",
    required: true
  }
})

const ImageSchema = new mongoose.Schema({
    type: {type: String,enum: ["image"],required: true},
    element: {type: Image,required: true},
    pos_size: {
        type: pos_size,
        required: true
      }

})

module.exports = ImageSchema