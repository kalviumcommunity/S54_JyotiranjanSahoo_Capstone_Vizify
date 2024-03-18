const mongoose = require('mongoose')

const UserDataSchema = mongoose.Schema({
    Name: {type:String,required: [true, "Please add a Name"]},
    Email: {type:String,unique:[true,"Email is already taken"],required: [true, "Please add a Email"]},
    Password: {type:String,required: [true, "Password can't be Empty"]},
    Presentations: [String],
    Images: [String],
    Username: {type:String,required: [true, "Please add a Username"],unique:[true,"Username is already taken"]},
})

const UserDataModel = mongoose.model("userdatas",UserDataSchema)
module.exports = UserDataModel