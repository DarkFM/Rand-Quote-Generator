// used jsonp so this is the name of the returned function

var variables = {
    quoteText: '',
    quoteAuthor: ''
}

function callBack(json) {
    variables.quoteText = json.quoteText;
    variables.quoteAuthor = json.quoteAuthor;

    if (!variables.quoteAuthor) {
        variables.quoteAuthor = "Unknown Person";
    }
    var quote = `<div class="newQuote">
                    <p class="quotes"> ${variables.quoteText} </p>
                    <blockquote> - ${variables.quoteAuthor} </blockquote>
                </div>`

    $(".quotes-container").html(quote);
}

function getQuote() {
    var number = Math.random()*100000;
    $.ajax({
        type: 'GET',
        url: "http://api.forismatic.com/api/1.0/",
        data: {
            method : 'getQuote',
            format: 'jsonp',
            key: number,
            lang: 'en',
            jsonp: "callBack"
        },
        dataType: 'jsonp',
        success: callBack
    });
}

// ****************    run the web app

$(document).ready(function() {
    getQuote(); 
    
    $('.quote-button').click(function () {
        getQuote();
    });  

    $(".tweet-button").on('click', function () {
        var attrValue = "https://twitter.com/intent/tweet?text=" +
                        variables.quoteText + "\n - " + variables.quoteAuthor; 
       $(".tweet-button").attr('href', attrValue);
    });
});
