function usunProdukt(id) {
    $.ajax({
        url: '/produkty/' + id + '/delete-json',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({id}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res)
            $("#"+id).remove();
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}