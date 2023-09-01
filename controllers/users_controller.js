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

module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: 'Codial | Sign In'
    })
}