const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req, res) {
      try {
        let post = await Post.create({
          content: req.body.content,
          user: req.user._id
        });

        if (req.xhr) { //xhr = xmlHttpRequest that means it was ajax request
          return res.status(200).json({
                 data: {
                   post: post
                 },
                 message: "Post created!"
          });
        }
        req.flash('success', 'Post Created');
        return res.redirect('back');
      } catch(err) {
        req.flash('error', err);
        console.log('Error in creating a post', err);
      }
}

module.exports.destroy = async function(req, res) {
     try {
      let post =  await Post.findById(req.params.id);
      //Only user who has written that post should be able to delete it
      //.id means converting the object id into string
      if (post.user == req.user.id) {
        await Post.findByIdAndDelete(req.params.id);

        //delete all the likes on the post and all the likes on the comments' likes too
        await Like.deleteMany({likeable: post, onModel: 'Post'});
        await Like.deleteMany({_id: {$in: post.comments}});


        await Comment.deleteMany({post: req.params.id});
        console.log('Succesfully deleted post along with comments');
        req.flash('success', 'Post and associated comments deleted');

        if (req.xhr) { //xhr = xmlHttpRequest that means it was ajax request
          return res.status(200).json({
                 data: {
                   post_id: req.params.id
                 },
                 message: "Post deleted!"
          });
        }

        return res.redirect('back');
      } else {
        req.flash('error', 'You cannot delete this post');
         return res.redirect('back');
      }
     } catch (err) {
      req.flash('error', 'You cannot delete this post');
      console.log('Something went wrong, post  not found', err);
      return res.redirect('back');
     }

}


module.exports.getAll = async function(req, res) {
  Post.find({})
  .populate({
      path: 'user',
      select: '-password -email'
  })
  .then((posts)=>{
      if (req.xhr) {
          return res.status(200).json({
              data: {
                  posts: posts
              },
              message: "Posts Fetched!"
          });
      } else {
          return res.redirect('/');
      }
  })
}