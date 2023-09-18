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
            }, error: function(err) {
                 console.log(err.responseText);
            }
          })
        });
    }

    let newPostDom = function (post) {
         return $(`<li id="post-${post._id}">
         
                 <small>
                 <a class="delete-post-button" href="/posts/destroy/${ post.id}">Delete</a>
                 </small>
        
                 ${ post.content }
         <br>
         <small>
         ${ post.user.name }
         </small>
         <div class="post-comments">
             
                 <form action="/comments/create" method="POST">
                     <input type="text" name="content" placeholder="Type here to add comment..." required>
                     <input type="hidden" name="post" value="${ post._id }">
                     <input type="submit" value="Add Comment">
                 </form>
             
         </div>
     
         <div class="post-comments-list">
             <ul id="post-comments-${ post._id}">
                 
             </ul>
         </div>
     
     </li>`);
    }

    //method to insert the post into DOM


    createPost();
}