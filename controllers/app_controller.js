/**
 * App controller:
 * Displays a list of all messages to the homepage
 */

//  Import Required models
const User = require("../models/user")
const Message = require("../models/message")

//  Import required modules
const { body, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler")

//  Display all messages
exports.index = asyncHandler(async (req, res, next) => {
    // const messages = await Message.find({}).exec()
    res.render('index', { title: 'Message Board Home'})
})

