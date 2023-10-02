const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: '1036822726383-v4gf9kmlki9lu1dkjvol27112ob9du64.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8000/users/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        //find a user
        User.findOne({email: profile.emails[0].value}).
        then((user)=>{
               console.log('profile', profile);
               if (user) {
                  //if found, set this user as req.user
                  return done(null, user);
               } else {
                   //if not found, create the user and set it as req.user: means sign in user
                   User.create({
                      name: profile.displayName,
                      email: profile.emails[0].value,
                      password: crypto.randomBytes(20).toString('hex')
                   }).then((user)=>{
                      return done(null, user);
                   }).catch((err)=>{
                      console.log('error in creating user', err);
                   })
               }
        }).catch((err)=>{
             console.log('error in google strategy', err);
             return;
        });
    } 

));

module.exports = passport;
