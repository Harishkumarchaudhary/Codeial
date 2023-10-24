{
    let setFriendshipStatus = async function() {
        let anchorTag = $('#toggle-friendship-button');
        const profileId = anchorTag.attr('data-profile')
        $.ajax({
            type: 'GET',
            url: '/friendships/getstatus/?friend_id='+profileId,
        })
        .done(function(data) {
            if (data.data.friendExist == true){
                anchorTag.html(`Remove Friend`);
            } else {
                anchorTag.html(`Add Friend`);
            }
        })
        .fail(function(errData) {
            console.log('error in completing the request', errData);
        });
    }

    setFriendshipStatus();
}