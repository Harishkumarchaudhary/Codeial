const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res) {
      Post.create({
        content: req.body.content,
        user: req.user._id
      }).then((post)=>{
        return res.redirect('back');
      })
      .catch((err)=>{
          console.log('Error in creating a post', err);
      });
}

module.exports.destroy = function(req, res) {
     Post.findById(req.params.id).then((post)=>{
      //Only user who has written that post should be able to delete it
      //.id means converting the object id into string
      if (post.user == req.user.id) {
         Post. findByIdAndDelete(req.params.id).then((post)=>{
          Comment.deleteMany({post: req.params.id}).then(()=>{
            console.log('Succesfully deleted post along with comments');
            return res.redirect('back');
          }).catch((err)=>{
           console.log('Something went wrong', err);
           return res.redirect('back');
          });
         }).catch((err)=>{

         });
      } else {
         return res.redirect('back');
      }
     }).catch((err)=>{
       console.log('Something went wrong, post  not found', err);
       return res.redirect('back');
     });
}