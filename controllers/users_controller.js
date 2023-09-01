module.exports.profile = function(req, res) {
    //return res.end('<h1>User profile</h1>');
    return res.render('users', {
        title: "Users Profile"
    });
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
    //ToDo later
}

//sign in and create session for loggin in user
module.exports.createSession = function(req, res) {
    //ToDo later
}