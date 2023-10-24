const Friendship = require('../models/friendship');
const User = require('../models/user');

module.exports.toggleFriend = async function (req, res) {
    try {
        const currentUserId = req.user._id;
        const friendId = req.query.friend_id;

        let friendExist = false;

        if (currentUserId != friendId) {
            let checkFromFriendships = await Friendship.find({from_user: currentUserId});
            let checkToFriendShips = await Friendship.find({to_user: currentUserId});
            
            for (fromFriend of checkFromFriendships) {
                if (fromFriend.to_user == friendId) {
                    friendExist = true;
                    break;
                }
            }

            for (toFriend of checkToFriendShips) {
                if (toFriend.from_user == friendId) {
                    friendExist = true;
                    break;
                }
            }
            
            let currentUser = await User.findOne({_id: currentUserId});
            let friendUser = await User.findOne({_id: friendId});

            if (friendExist) {
                //Remove the friendship
                let a = await Friendship.findOne({from_user: currentUserId, to_user: friendId});
                let b = await Friendship.findOne({from_user: friendId, to_user: currentUserId});
                await Friendship.deleteOne({from_user: currentUserId, to_user: friendId});
                await Friendship.deleteOne({from_user: friendId, to_user: currentUserId});
                
                a!= null ? currentUser.friendships.pull(a._id) : "";
                b!= null ? currentUser.friendships.pull(b._id) : "";
                a!= null ? friendUser.friendships.pull(a._id) : "";
                b!= null ? friendUser.friendships.pull(b._id) : "";

                currentUser.save();
                friendUser.save();

                return res.json(200, {
                    data: {
                    friendExist: friendExist
                    },
                    message: "Friendship already exists!"
                });
            }

            let friendship = await Friendship.create({
                from_user: currentUserId,
                to_user: friendId
            });

            if (currentUser && friendUser) {
                currentUser.friendships.push(friendship._id);
                friendUser.friendships.push(friendship._id);
                currentUser.save();
                friendUser.save();
                return res.json(200, {
                    data: {
                        friendExist: friendExist
                    },
                    message: "Friendship Created!"
                });
            }
        }
        return res.json(200, {
            data: {
            friendExist: friendExist
            },
            message: "Friendship Created!"
        });
    } catch (err) {
        console.log('Error in creating friendship', err);
        return res.json(501, {
                message: "Internal Server Error!"
        });
    }
}

module.exports.getStatus = async function(req, res) {
    try {
        const currentUserId = req.user._id;
        const friendId = req.query.friend_id;


        let friendExist = false;

        if (currentUserId != friendId) {
            let checkFromFriendships = await Friendship.find({from_user: currentUserId});
            let checkToFriendShips = await Friendship.find({to_user: currentUserId});
            
            for (fromFriend of checkFromFriendships) {
                if (fromFriend.to_user == friendId) {
                    friendExist = true;
                    break;
                }
            }

            for (toFriend of checkToFriendShips) {
                if (toFriend.from_user == friendId) {
                    friendExist = true;
                    break;
                }
            }
        }

        return res.json(200, {
            data: {
              friendExist: friendExist
            }, 
            message: 'Status Success'
        })


    } catch (err) {
        console.log('Error in getting status', err);
        return res.json(501, {
            message: 'Internal Server Error'
        })
    }    
}