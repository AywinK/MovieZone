
var searchSubmitEl = $("#search[type=submit]");

console.log("test");

searchSubmitEl.click(function (e) {
    e.preventDefault();
    var userInput = $("#search[type=text]"); 
    var movieTitle = userInput.val();
    if (movieTitle) {
        console.log(movieTitle);
        getOmdbAPIData(movieTitle);
        userInput.val(``);
        
    }
    
});

function getOmdbAPIData(movieTitle) {

    var omdbAPIKey = "fac4214b";
    baseUrl = `http://www.omdbapi.com/?apikey=${omdbAPIKey}&`
    titleSearchUrl = baseUrl + `t=${movieTitle}&`
    
    $.get(titleSearchUrl)
    .then(function (OmdbDataObj) {
        console.log(OmdbDataObj);
    })

}

function extractsDatafromOmdbDataObj(OmdbDataObj)