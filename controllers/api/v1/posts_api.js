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
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({post: req.params.id});
        console.log('Succesfully deleted post along with comments');

        return res.status(200).json({
            message: "Post and associated comments deleted"
        });
    } catch (err) {
        console.log('Error in deleting post and comments', err);
        return res.status(500).json({
            message: "Internal Sever Error!"
        });
    }
}
