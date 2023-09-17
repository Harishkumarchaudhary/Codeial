const User = require('../models/user');

module.exports.profile = function(req, res) {
    //return res.end('<h1>User profile</h1>');
    User.findById(req.params.id)
    .then((user)=>{
        return res.render('users', {
            title: "Users Profile",
            profile_user: user
        });
    }).catch((err)=>{

    });
}

module.exports.update = function(req, res) {
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body)
        .then((user)=>{
             return res.redirect('back');
        })
        .catch((err)=>{

        });
    } else {
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signUp = function(req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: 'Codial | Sign Up'
    })
}

//render sign in page
module.exports.signIn = function(req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    
    return res.render('user_sign_in', {
        title: 'Codial | Sign In'
    })
}

//get the sign up data
module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email})
    .then((user)=>{
        if (!user) {
            User.create(req.body)
            .then((user)=>{
                console.log(user);
                return res.redirect('/users/sign-in');
            }).catch((err)=>{
                console.log('error in creating user while signing up'); return;
            });
        } else {
            return res.redirect('back');
        }
    }).catch((err)=>{
        console.log('error in finding user while signing up'); return;
    })
}

//sign in and create session for loggin in user
module.exports.createSession = function(req, res) {
    req.flash('success', 'Loggend in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err){
        req.flash('success', 'You have been logged out');
        return res.redirect('/');
    }); //this function is given to req by passport
}