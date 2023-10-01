const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
               path: 'user'
            }
    });

    return res.json(200, {
        message: 'List of posts',
        posts: posts
    });
}


module.exports.destroy = async function(req, res) {
    try {
        let post =  await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            await Post.findByIdAndDelete(req.params.id);
            await Comment.deleteMany({post: req.params.id});
            console.log('Succesfully deleted post along with comments');
    
            return res.json(200, {
                message: "Post and associated comments deleted"
            });
        } else {
            return res.json(401, {
                message: "Unauthorized user, you cannot delete this post"
            })
        }
    } catch (err) {
        console.log('Error in deleting post and comments', err);
        return res.json(500, {
            message: "Internal Sever Error!"
        });
    }
}
