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
            }, error: function(err) {
                 console.log(err.responseText);
            }
          })
        });
    }

    //method to insert the post into DOM


    createPost();
}