
{
    //method to create a post using ajax
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
          e.preventDefault();
          $.ajax({
            url: '/posts/create',
            type: 'post',
            data: newPostForm.serialize(), //converts form data into json
            success: function(data) {
                 console.log(data);
                 let newPost = newPostDom(data.data.post);
                 $("#posts-list-container>ul").prepend(newPost);
                 deletePost($(' .delete-post-button', newPost)); //the class is inside newPost object

                 //enable the functionality of the toggle like button on new post
                 toggleLike($(' .toggle-like-button', newPost));
            }, error: function(err) {
                 console.log(err.responseText);
            }
          })
        });
    }

    let fetchAllPosts = function () {
        $.ajax({
            url: '/posts/all',
            type: 'get',
            success: function(data) {
                 console.log(data);
                 let posts = data.data.posts;
                 for (post of posts) {
                    let newPost = newPostDom(data.data.post);
                    $("#posts-list-container>ul").prepend(newPost);
                    deletePost($(' .delete-post-button', newPost)); //the class is inside newPost object
   
                    //enable the functionality of the toggle like button on new post
                    toggleLike($(' .toggle-like-button', newPost));
                 }
            }, error: function(err) {
                 console.log(err.responseText);
            }
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

    
    //method to insert the post into DOM
    let newPostDom = function (post) {
         return $(`<li id="post-${post._id}">
         
                 <small>
                 <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
                 </small>
        
                 ${ post.content }
         <br>
         <small>
         ${ post.user.name }
         </small>

         <br>
         <br>
         <small>
             <a class = "toggle-like-button" data-likes="0" href= "/likes/toggle/?id=${post._id}&type=Post">
             0 likes
             </a>
         </small>
         <br>
         <br>
         

         <div class="post-comments">
             
                 <form action="/comments/create" method="POST" id="new-comment-form">
                     <input type="text" name="content" placeholder="Type here to add comment..." required>
                     <input type="hidden" name="post" value="${post._id }">
                     <input type="submit" value="Add Comment">
                 </form>
             
         </div>
     
         <div class="post-comments-list">
             <ul id="post-comments-${post._id}">
                
             </ul>
         </div>
     
     </li>`);
    }

    //method to delete post from DOM
    let deletePost = function(deleteLink) { //deleteLink is the a tag
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    console.log('Data is:', data);
                     $(`#post-${data.data.post_id}`).remove();
                }, 
                error: function(err) {
                     console.log(err.responseText);
                }
            })
        })

    }


    createPost();
    fetchAllPosts();
}