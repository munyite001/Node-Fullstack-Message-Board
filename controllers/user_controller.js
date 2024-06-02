//  Import the User models
const User = require('../models/user')

//  Import additional required modules
const { body, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')


//  Display User Sign Up form on get
exports.user_signup_get = asyncHandler(async (req, res, next) => {
    res.render("sign_up", { title: "Sign Up" })
})

//  Handle User Sign Up on post
exports.user_signup_post = [
    //  Validate and sanitize fields
    body("first_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters.")
    .escape(),
    body("last_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters.")
    .escape(),
    body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username must be specified.")
    .escape(),
    body("password")
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be between 6 and 16 characters.")
    .escape(),
    body("confirm_password")
    .trim()
    .escape(),

    //  Process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        //  Extract the validation errors from a request
        const errors = validationResult(req)

        //  Make sure that password and confirm password fields match
        if (req.body.password !== req.body.confirm_password) {
            errors.errors.push({ msg: "Passwords do not match." })
        }

        //  Check if user already exists
        const userExists = await User.findOne({ username: req.body.username })

        if (userExists) {
            errors.errors.push({ msg: "A User with that username already exists." })
        }

        //  Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        //  Create a new user object with escaped and trimmed data
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: hashedPassword,
            membership_status: false,
            admin: false
        })

        //  Handle errors
        if (!errors.isEmpty()) {
            res.render("sign_up", { 
                title: "Sign Up", 
                user: user, 
                errors: errors.array() })
            return
        } else {
            //  Everything is valid
            await user.save()
            res.redirect("/")
        }
    })

]