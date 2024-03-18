const mongoose = require('mongoose')
const GradientSchema = require('./GradientSchema')

const BackgroundSchema = new mongoose.Schema({
    color: String,
    image: String,
    gradient: GradientSchema,
  });

module.exports = BackgroundSchema