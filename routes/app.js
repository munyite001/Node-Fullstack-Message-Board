const express = require('express')
const router = express.Router()

//  Import all controllers
const app_controller = require('../controllers/app_controller')
const user_controller = require('../controllers/user_controller')
const message_controller = require('../controllers/message_controller')


///  ROUTES   ///

//  Home page displaying all messages
router.get('/', app_controller.index)

//  GET request for user sign up //
router.get('/sign-up', user_controller.user_signup_get)

//  Post Request for user sign up //
router.post('/sign-up', user_controller.user_signup_post)

//  Get request for user login
router.get('/login', user_controller.user_login_get)

//  Post request for user login
router.post('/login', user_controller.user_login_post)

//  Secret phrase to join the club
router.post("/join", user_controller.user_join_post)

//  Post request for message
router.post('/messages', message_controller.message_post)

//  Get all messages
router.get("/messages", message_controller.messages_get)


//  Get request for user logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) { 
            return next(err) 
        }
        res.redirect("/")
    })
})


module.exports = router;