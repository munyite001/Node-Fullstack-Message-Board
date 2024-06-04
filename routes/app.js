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


module.exports = router;