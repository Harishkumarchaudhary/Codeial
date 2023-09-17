const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res) {
    // return res.end('<h1>Express is up for Codial</h1>')
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}).then((posts)=>{
    //     return res.render('home', {
    //         title: "Home",
    //         posts: posts
    //     });
    // }).catch({

    // });


    //populating whole user instead of just id
    try {
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
               path: 'user'
            }
        });
    
        let users = await User.find({});
        return res.render('home', {
                    title: "Home",
                    posts: posts,
                    all_users: users
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }
}