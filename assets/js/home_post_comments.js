// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX
console.log('camee');
class PostComments {
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function () {
            self.deleteComment($(this));
        });
    }


    createComment(postId) {
        let pSelf = this;
        this.newCommentForm.submit(function (e) {
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function (data) {
                    let newComment = pSelf.newCommentDom(data.data.comment, data.username,data.useravatar);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    $(`#input-comment-${postId}`).val("");
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    // CHANGE :: enable the functionality of the toggle like button on the new comment
                    new ToggleLike($(' .toggle-like-button', newComment));
                    // console.log('comment');
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
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


    newCommentDom(comment, username,useravatar) {
        // CHANGE :: show the count of zero likes on this comment

        return $(`<li id="comment-${comment._id}">
                        <p>
                            
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}"><i class="material-icons" style="font-size:20px;color:red">delete</i></a>
                            </small>
                            <small>
                            <img src="${useravatar}" style="width:40px;border-radius: 50%;" alt="">         
                                ${username}
                            </small>
                            <small>
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                <i class="fa fa-heart" style="font-size:20px;color:red"></i> 0 
                                </a>
                            </small>
                            <div style="padding:10px;border: 1px solid gainsboro; margin: 5px;">
                            ${comment.content}
                            </div>
                        </p>    

                </li>`);
    }


    deleteComment(deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            var userconfirmed = confirm('Delete this Comment');
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
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
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
}