const User = require('../models/user');
const fs = require('fs');
const path = require('path');

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

module.exports.update = async function(req, res) {
    // if (req.user.id == req.params.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body)
    //     .then((user)=>{
    //          return res.redirect('back');
    //     })
    //     .catch((err)=>{

    //     });
    // } else {
    //     return res.status(401).send('Unauthorized');
    // }

    if (req.user.id == req.params.id) {
        try {
            let user = await User.findByIdAndUpdate(req.params.id, req.body);
            User.uploadedAvatar(req, res, function(err){
                 if (err) {console.log('****Multer error:', err)};

                 console.log('file info::', req.file);
                 user.name = req.body.name;
                 user.email = req.body.email;

                 if (req.file) {
                     
                    // check if an avatar exists for the user or not! if yes, delete it!
                    if (user.avatar &&fs.existsSync(path.join(__dirname, '..', user.avatar))) {
                            //delete the avatar
                            fs.unlinkSync(path.join(__dirname  , '..', user.avatar));
                    }
                    //saving the path of uploaded file into the avatar field of the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                    user.save();
                    return res.redirect('back');
                 }
            });
        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'Unauthorized');
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