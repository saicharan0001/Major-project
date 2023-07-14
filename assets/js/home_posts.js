{
    console.log("came");
    // method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post, data.username);
                    $('#posts-list-container>ul').prepend(newPost);
                    shownoty(data.flash);
                    deletePost($(' .delete-post-button', newPost));
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function (post, username) {
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/destroy/${post._id}">X</a>
                        </small>
                       
                        ${post.content}
                        <a href="/likes/toggle/?id=${post._id}&type=Post">0</a>
                        <br>
                        <small>
                        ${username}
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${post._id}" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    shownoty(data.flash);
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });

        });
    }

    //To delete the old posts via ajax 
    let d = () => {
        let posts = $('.delete-post-button');
        var i = 0;
        for (i = 0; i < posts.length; i++) {
            let obj = posts.eq(i).attr("href");
            posts.eq(i).on('click', function (e) {
                e.preventDefault();
                console.log(obj);
                $.ajax({
                    type: 'get',
                    url: `${obj}`,
                    success :function(data){
                        console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                    shownoty(data.flash);
                    }
                })
            })
        }
        return;
    }
    d();
    // TODO
    // let deletePost =(post)=>{
    //     $.ajax({
    //         type:'post',
    //         ul : `/posts/destroy/${post.id}`,

    //     })
    // }

    let shownoty = (flash) => {
        console.log(flash.success);
        if (flash.success && flash.success.length > 0) {
            new Noty({
                theme: 'relax',
                text: `${flash.success}`,
                type: 'success',
                layout: 'topRight',
                timeout: 1500

            }).show();
        }
    }


    createPost();
}