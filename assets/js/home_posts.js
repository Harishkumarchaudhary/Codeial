
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
            }, error: function(err) {
                 console.log(err.responseText);
            }
          })
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
         <div class="post-comments">
             
                 <form action="/comments/create" method="POST">
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
}