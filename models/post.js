const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
      content: {
        type: String,
        required: true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //refer to user schema
      },
      //Include the array of ids of all
      // the comments in this post schema because we need to access comments for a post very frequently
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment' //refer to Comment schema
        }
      ]
}, {
        timestamps: true //This field will create createdAt and updatedAt in db. Mongoose does it for us
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;