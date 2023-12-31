const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const env = require('./environment');

const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_callback_url
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
