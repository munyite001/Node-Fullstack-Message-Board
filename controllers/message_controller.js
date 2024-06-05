//  import the Message Model
const Message = require("../models/message");

//  Import required modules
const { body, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler")


//  Handle Message Post on post
exports.message_post = [
    //  Validate and sanitize fields
    body("message")
    .trim()
    .isLength({ min: 1 })
    .withMessage("You can't post an empty message")
    .escape(),

    //  Process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        //  Extract the validation errors from a request
        const errors = validationResult(req)
        
        
        //  Create a new message object with escaped and trimmed data
        const message = new Message({
            message: req.body.message,
            author: req.user._id,
            timestamp: Date.now()
        })

        //  If there are errors, render the form again with sanitized values/error messages
        if (!errors.isEmpty()) {
            res.render("index", {
                title: "Message Board Home",
                user: req.user,
                message: message,
                errors: errors.array()
            })
            return
        } else {
            //  Data from form is valid, save message
            await message.save()
            res.redirect("/")
        }
    })
]

//  Get all messages
exports.messages_get = asyncHandler(async (req, res, next) => {
    const all_messages = await Message.find({}).populate('author').exec()
    res.json(all_messages)
})