const mongoose = require("mongoose")
const { DateTime } = require("luxon")
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    timestamp: {type: Date, required: true, default: Date.now},
    message: {type: String, required: true, maxLength: 1000},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
})

//  Virtual for formatted timestamp
MessageSchema.virtual("createdAt").get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED)
})

module.exports = mongoose.model("Message", MessageSchema)