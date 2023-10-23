{
    let createComment = function() {
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function(e){
          e.preventDefault();
          $.ajax({
            url: '/comments/create',
            type: 'post',
            data: newCommentForm.serialize(), //converts form data into json
            success: function(data) {
                 console.log(data);
                 let newComment = newCommentDom(data.data.comment);
                 $('#post-comments-' + data.data.comment.post).prepend(newComment);
                 console.log($(' .delete-comment-btn', newComment));
                 deleteComment($(' .delete-comment-btn', newComment));

                 //enable the functionality of the toggle like button on new post
                 toggleLike($(' .toggle-like-button', newComment));
            }, error: function(err) {
                 console.log(err.responseText);
            }
          })
        });
    }

    let toggleLike = function(anchorTag) {
        $(anchorTag).click(function(e){
            e.preventDefault();
    
            console.log('url for like-toggle: ', $(anchorTag).attr('href'));
                $.ajax({
                    type: 'POST',
                    url: $(anchorTag).attr('href'),
                })
                .done(function(data) {
                    let likesCount = parseInt($(anchorTag).attr('data-likes'));
                    console.log(likesCount);
                    if (data.data.deleted == true){
                        likesCount -= 1;
                        
                    }else{
                        likesCount += 1;
                    }
    
                    $(anchorTag).attr('data-likes', likesCount);
                    $(anchorTag).html(`${likesCount} Likes`);
    
                })
                .fail(function(errData) {
                    console.log('error in completing the request');
                });
        });
    }

    let newCommentDom = function(comment) {
        return $(`
            <li id="comment-${comment._id}">         
            <small>
                <a href="/comments/destroy/${comment._id}" class="delete-comment-btn">Delete</a>
            </small>
                ${comment.content}
            <br>
            <small>
            ${comment.user.name}
            </small>

            <br>
            <br>
            <small>
             <a class = "toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
             0 likes
             </a>
             </small>
             <br>
             <br>


            </li>
        `);
    }

    let deleteComment = function(deleteLink) { //deleteLink is the a tag
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    console.log('Data is:', data);
                     $(`#comment-${data.data.comment_id}`).remove();
                }, 
                error: function(err) {
                     console.log(err.responseText);
                }
            })
        })

    }

    let fetchAllComments = function() {
          $.ajax({
            url: '/comments/getAll',
            type: 'get',
            success: function(data) {
                 console.log(data);
                 let comments = data.data.comments;
                 for (comment of comments) {
                    let newComment = newCommentDom(comment);
                    $('#post-comments-' + comment.post).prepend(newComment);
                    toggleLike($(' .toggle-like-button', newComment));
                    console.log($(' .delete-comment-btn', newComment));
                    deleteComment($(' .delete-comment-btn', newComment));
                 }
            }, error: function(err) {
                 console.log(err.responseText);
            }
          });
    }

    createComment();
    fetchAllComments();
}