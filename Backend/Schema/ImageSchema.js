const mongoose = require('mongoose')


const ImageSchema = new mongoose.Schema({
    imageUrl: {type: String,match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Please enter a valid URL']},
    createdBy: String,
})

const ImageModel = mongoose.model("images",ImageSchema)

module.exports = ImageModel