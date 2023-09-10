const Comment = require('../models/comment');
const Post = require('../models/post')

module.exports.create = function(req, res) {
    Post.findById(req.body.post).then((post)=>{
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then((comment)=>{
                post.comments.push(comment);
                post.save(); //save is called whenever we updates something
                console.log('post is updated')
                return res.redirect('/');
            }).catch((err)=>{
                return res.redirect('/');
            });
        }
    }).catch((err)=>{
        return res.redirect('/');
    });
}