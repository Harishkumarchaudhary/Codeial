const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

async function populateUser(comment, res) {
    let updatedComment =  await comment.populate({
        path: 'user',
        select: '-password'
    });
    //commentsMailer.newComment(updatedComment);
    let job = queue.create('emails', updatedComment).save(function (err) {
        if (err) {console.log('error in creating the queue'); return; }
        console.log('job enqueued ', job.id);
    });
    return res.status(200).json({
        data: {
           comment: updatedComment
        },
        message: "Comment Added!"
    });
}

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
                   populateUser(comment, res);
                } else {
                   return res.redirect('/');
                }
            }).catch((err)=>{
                return res.redirect('/');
            });
        }
    }).catch((err)=>{
        return res.redirect('/');
    });
}

module.exports.getAll = function(req, res) {
    Comment.find({})
    .populate({
        path: 'user',
        select: '-password -email'
    }).then((comments)=>{
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    comments: comments
                },
                message: "Comments Fetched!"
            });
        } else {
            return res.redirect('/');
        }
    })
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
                            message: "Comment Deleted!"
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