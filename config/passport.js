const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

//  Configure the local strategy
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async(username, password, done) => {
    try {
        //  Find the user given the username
        const user = await User.findOne({username: username})

        if (!user) {
            return done(null, false, {message: 'User not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return done(null, false, {message: 'Incorrect password'})
        }
        return done(null, user)
    } catch (error) {
        return done(error)
    }
}));

//  Serialize user to save user id in session
passport.serializeUser((user, done) => {
    done(null, user.id)
});


//  Deserialize user to fetch user from database by id
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch (err) {
        done(err)
    }
})

module.exports = passport;