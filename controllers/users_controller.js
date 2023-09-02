const User = require('../models/user');

module.exports.profile = function(req, res) {
    //return res.end('<h1>User profile</h1>');
    if (req.cookies.user_id) {
            User.findById(req.cookies.user_id).then((user)=>{
                return res.render('users', {
                    title: "Users Profile",
                    user: user
                });
            }).catch((err)=>{
                return res.redirect('/users/sign-in');
            });
    } else {
        return res.redirect('/users/sign-in');
    }
}

module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: 'Codial | Sign Up'
    })
}

//render sign in page
module.exports.signIn = function(req, res) {
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
    
    //find the user
    User.findOne({email: req.body.email})
    .then((user)=>{
        //handle user found
        if (user) {
                  //handle password which doesn't match
                  if (user.password != req.body.password) {
                      return res.redirect('back');
                  }

                 //handle session creation
                 res.cookie('user_id', user.id);
                 return res.redirect('/users/profile');
        } else {
               //handle user not found
               return res.redirect('back');
        }

    }).catch((err)=>{
        console.log('error in finding user while signing in'); return;
    });


}