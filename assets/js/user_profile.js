{
    $('#follow-btn').on('click', function (e) {
        e.preventDefault();
        console.log()

        $.ajax({
            type: 'get',
            url: $('#follow-btn').attr('href'),
            success: function (data) {
              $('#follow-button').text(data.data);
            }
        })
    })
}