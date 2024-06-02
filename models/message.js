const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    title: {type: String, required: true, maxLength: 100},
    timestamp: {type: Date, required: true, default: Date.now},
    message: {type: String, required: true, maxLength: 1000},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
})

module.exports = mongoose.model("Message", MessageSchema)