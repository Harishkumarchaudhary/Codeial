const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codial'
}


passport.use(new JWTStrategy(opts, function(jwtPayload, done){

    User.findById(jwtPayload._id).then((user)=>{
        if (user) {
            return done(null, user); //this user is set in req by passport : very important
        } else {
            return done(null, false); //user not found
        }
    }).catch((err)=>{
        console.log('Error in finding user from JWT');
        return;
    });
}));


module.exports = passport;