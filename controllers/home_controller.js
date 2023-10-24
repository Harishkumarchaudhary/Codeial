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
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
               path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');
    
        let users = await User.find({}).populate({
           path: 'friendships',
           populate: {
            path: 'from_user'
           },
           populate: {
            path: 'to_user'
           }
        });

        return res.render('home', {
                    title: "Home",
                    posts: posts,
                    all_users: users
        });
    } catch (err) {
        console.log('Error in rendering Homw View', err);
        return;
    }
}