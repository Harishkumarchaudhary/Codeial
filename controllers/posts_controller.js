const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
      try {
        await Post.create({
          content: req.body.content,
          user: req.user._id
        });
        return res.redirect('back');
      } catch(err) {
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
        return res.redirect('back');
      } else {
         return res.redirect('back');
      }
     } catch (err) {
      console.log('Something went wrong, post  not found', err);
      return res.redirect('back');
     }

}