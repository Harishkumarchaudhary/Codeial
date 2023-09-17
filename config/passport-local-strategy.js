const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
           usernameField: 'email',
           passReqToCallback: true
      },
      function(req, email, password, done) {
          //find a user and establish the identity
          User.findOne({email: email}).then((user)=>{

            if (!user || user.password != password) {
                console.log('Invalid user/pwd');
                req.flash('error', 'Invalid Username/password');
                return done(null, false);
            }

            return done(null, user);
              
          }).catch((err)=>{
                req.flash('error', err)
                console.log('Error in finding the user--> Passport');
                return done(err);
          });
      }
));

//serializing the user to decide which key is to be kept in cookies like we did in manual-auth
passport.serializeUser(function(user, done) {
          done(null, user.id); //We are encrypting userid in the cookie
});



//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done) {
       User.findById(id).then((user)=>{
          return done(null, user);
       }).catch((err)=>{
          console.log('Error in finding the user--> Passport');
          return done(err);
       });
});


//Check if the user is authenticated
passport.checkAuthentication = function(req, res, next) {
     //if user is signed in, then pass on the request to the next function(controller's action)
     if(req.isAuthenticated()) {
        return next();
     }

     //if user is not signed in
     return res.redirect('/users/sign-in');
}


passport.setAuthenticationUser = function(req, res, next) {
     if (req.isAuthenticated()) {
        //req.user contains the signed in user from the session cookie
        //and we are just sending this to locals for views, remember locals.title?
        res.locals.user = req.user;
     }

     next();
}


module.exports = passport;