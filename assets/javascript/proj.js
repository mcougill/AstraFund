$(document).ready(function () {
    var userInput = "T";

    var query = "{'spec':" + userInput + "}";

    var limit = "1";

    var url = "https://asterank.com/api/asterank?query=" + query + "&limit=" + limit;

    console.log("testing a branch");
    console.log(url);
    $.ajax({
        url: url,
        method: "GET",
    }).then(function (response) {

        console.log(response);

    });

});