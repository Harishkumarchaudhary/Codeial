const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
      content: {
        type: String,
        required: true
      },
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' //refer to Post schema
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //refer to user schema
      },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Like' //refer to Likes schema
        }
      ]
}, {
        timestamps: true //This field will create createdAt and updatedAt in db. Mongoose does it for us
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;