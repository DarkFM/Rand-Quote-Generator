// used jsonp so this is the name of the returned function
function callBack(json) {
    var quote = `<div class="newQuote">
                    <p class="quotes"> ${json.quoteText} </p>
                    <blockquote> ${json.quoteAuthor} </blockquote>
                </div>`
    $(".quotes-container").html(quote);
}

function getQuote() {
    var number = Math.random()*10000;
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

// run the web app

$(document).ready(function() {
    getQuote(); 
    
    $('.quote-button').click(function () {
        $(".newQuote").fadeOut(3000);
        getQuote();
        $(".newQuote").fadeIn(3000);
        
    });   
});
