// {
//     console.log("came");
//     // method to submit the form data for new post using AJAX
//     let createPost = function () {
//         let newPostForm = $('#new-post-form');

//         newPostForm.submit(function (e) {
//             e.preventDefault();

//             $.ajax({
//                 type: 'post',
//                 url: '/posts/create',
//                 data: newPostForm.serialize(),
//                 success: function (data) {
//                     let newPost = newPostDom(data.data.post, data.username);
//                     $('#posts-list-container>ul').prepend(newPost);
//                     shownoty(data.flash);
//                     deletePost($(' .delete-post-button', newPost));
//                 }, error: function (error) {
//                     console.log(error.responseText);
//                 }
//             });
//         });
//     }


//     // method to create a post in DOM
//     let newPostDom = function (post, username) {
//         return $(`<li id="post-${post._id}">
//                     <p>

//                         <small>
//                             <a class="delete-post-button"  href="/posts/destroy/${post._id}">X</a>
//                         </small>

//                         ${post.content}
//                         <a href="/likes/toggle/?id=${post._id}&type=Post">0</a>
//                         <br>
//                         <small>
//                         ${username}
//                         </small>
//                     </p>
//                     <div class="post-comments">

//                             <form action="/comments/create" method="POST">
//                                 <input type="text" name="content" placeholder="Type Here to add comment..." required>
//                                 <input type="hidden" name="post" value="${post._id}" >
//                                 <input type="submit" value="Add Comment">
//                             </form>


//                         <div class="post-comments-list">
//                             <ul id="post-comments-${post._id}">

//                             </ul>
//                         </div>
//                     </div>

//                 </li>`)
//     }


//     // method to delete a post from DOM
//     let deletePost = function (deleteLink) {
//         $(deleteLink).click(function (e) {
//             e.preventDefault();

//             $.ajax({
//                 type: 'get',
//                 url: $(deleteLink).prop('href'),
//                 success: function (data) {
//                     $(`#post-${data.data.post_id}`).remove();
//                     shownoty(data.flash);
//                 }, error: function (error) {
//                     console.log(error.responseText);
//                 }
//             });

//         });
//     }

//     //To delete the old posts via ajax 
//     let d = () => {
//         let posts = $('.delete-post-button');
//         var i = 0;
//         for (i = 0; i < posts.length; i++) {
//             let obj = posts.eq(i).attr("href");
//             posts.eq(i).on('click', function (e) {
//                 e.preventDefault();
//                 console.log(obj);
//                 $.ajax({
//                     type: 'get',
//                     url: `${obj}`,
//                     success :function(data){
//                         console.log(data);
//                     $(`#post-${data.data.post_id}`).remove();
//                     shownoty(data.flash);
//                     }
//                 })
//             })
//         }
//         return;
//     }
//     d();
//     // TODO
//     // let deletePost =(post)=>{
//     //     $.ajax({
//     //         type:'post',
//     //         ul : `/posts/destroy/${post.id}`,

//     //     })
//     // }

//     let shownoty = (flash) => {
//         console.log(flash.success);
//         if (flash.success && flash.success.length > 0) {
//             new Noty({
//                 theme: 'relax',
//                 text: `${flash.success}`,
//                 type: 'success',
//                 layout: 'topRight',
//                 timeout: 1500

//             }).show();
//         }
//     }


//     createPost();
// }


//Other version

{
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
                    let newPost = newPostDom(data.data.post, data.userdetails);
                    $('#posts-list-container>ul').prepend(newPost);
                    $('#text-area').val("");
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();

                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function (post, userdetails) {
        // CHANGE :: show the count of zero likes on this post
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/destroy/${post._id}"><i class="material-icons" style="font-size:20px;color:red">delete</i></a>
                        </small>
                        <small>
                 <img src="${userdetails.avatar}" style="width:50px;border-radius: 50%;" alt="">
                        ${userdetails.username}
                        </small>
                       
                        <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                <i class="fa fa-heart" style="font-size:20px;color:red"></i> 0 
                                </a>
                            
                        </small>
                     <div style="padding:10px;border: 1px solid gainsboro;margin: 5px;">
                        ${post.content}
                </div>
                        <br>

                    </p>
                    <div class="post-comments">
                        
                            <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required style="width:85%;border: none;outline: none;" id="input-comment-${post._id}">
                                <input type="hidden" name="post" value="${post._id}" >
                                <input type="submit" value="&#10148;">
                            </form>
               
                            <div class="comments-collapse" id="comment-collapse-${post._id}" style="cursor:pointer;" onclick="togglecomments('${post._id}')">
                            ▶ Comments
                        </div>

                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}" style="display: none;">
                            </ul>
                        </div>
                    </div>
                </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            //alert the user before deleting
            var userconfirmed = confirm('Delete this post');
            if (userconfirmed) {
                //nothing to do
            }
            else {
                return;
            }
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });

        });
    }





    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function () {
        $('#posts-list-container>ul>li').each(function () {
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}

function togglecomments(postid){
   let obj = document.getElementById(`post-comments-${postid}`)
   let obj2 = document.getElementById(`comment-collapse-${postid}`)
    if(obj.style.display=='block'){
        obj.style.display='none'; 
        obj2.innerText = '▶ Comments';
    }
    else{
        obj.style.display = 'block';
        obj2.innerText = '▼ Comments';
    }
    return;
}

// let wordform = $('.word-post-form');
// wordform.submit(function(e){
//     e.preventDefault();
//     let val = $('.word').val();
//     console.log(val);
//     $.ajax({
//         type:'get',
//         url:`https://api.dictionaryapi.dev/api/v2/entries/en/${val}`,
//         success:function(data){
//             console.log(data);
//         }
//     })
// })