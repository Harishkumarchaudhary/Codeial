const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
      try {
        await Post.create({
          content: req.body.content,
          user: req.user._id
        });
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
        await Comment.deleteMany({post: req.params.id});
        console.log('Succesfully deleted post along with comments');
        req.flash('success', 'Post and associated comments deleted');
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