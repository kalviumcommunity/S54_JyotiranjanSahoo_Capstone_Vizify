const mongoose = require('mongoose')

const ShapeSchema = new mongoose.Schema({
    align: String,
    flipH: String,
    flipV: String,
    rotate: Number,
    rectRadius: Number,
    shapeName: String,
})

module.exports = ShapeSchema