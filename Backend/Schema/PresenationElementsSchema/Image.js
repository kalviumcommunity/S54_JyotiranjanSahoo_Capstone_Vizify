const mongoose = require('mongoose')


const ImageSchema = new mongoose.Schema({
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

module.exports = ImageSchema