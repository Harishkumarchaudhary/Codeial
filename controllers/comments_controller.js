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
                console.log('post is updated');
                if (req.xhr) {
                    return res.status(200).json({
                        data: {
                          comment: comment
                        },
                        message: "Comment Added!"
                    });
                }
                return res.redirect('/');
            }).catch((err)=>{
                return res.redirect('/');
            });
        }
    }).catch((err)=>{
        return res.redirect('/');
    });
}


module.exports.destroy = function(req, res) {
    Comment.findById(req.params.id)
    .then((comment)=>{
         if (comment.user == req.user.id) {
             let postId = comment.post;
             Comment.findByIdAndDelete(req.params.id).then((comment)=>{
                Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}})
                .then((post)=>{
                    if (req.xhr) {
                        return res.status(200).json({
                            data: {
                              comment_id: req.params.id
                            },
                            message: "Comment Added!"
                        });
                    }
                    return res.redirect('back');
                })
                .catch((err)=>{
                    return res.redirect('back');
                });
             }).catch((err)=>{
                return res.redirect('back');
             });
         } else {
            return res.redirect('back');
         }
    }).catch((err)=>{
        return res.redirect('back');
    });
}