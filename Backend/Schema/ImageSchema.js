const mongoose = require('mongoose')


const ImageSchema = new mongoose.Schema({
    prompt: {type: String, required: true},
    images: [{type: String,match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Please enter a valid URL']}],
    createdBy: {type: mongoose.Schema.Types.ObjectId , required: true},
})

const ImageModel = mongoose.model("imagedatas",ImageSchema)

module.exports = ImageModel