
var searchSubmitEl = $("form #search[type=submit]");

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
    var baseUrl = `https://www.omdbapi.com/?apikey=${omdbAPIKey}&`;
    var contentType = "type=movie&";
    titleSearchUrl = baseUrl + `t=${movieTitle}&` + contentType;

    $.get(titleSearchUrl)
        .then(function (OmdbDataObj) {
            console.log(OmdbDataObj);
            var movieData = extractsDatafromOmdbDataObj(OmdbDataObj);
            addsMovieDataToElement(movieData);
            var movieTitle = OmdbDataObj.Title;
            console.log(movieTitle + ": this line 31");
            getsYouTubeVideo(movieTitle);
        })

}

function extractsDatafromOmdbDataObj(OmdbDataObj) {
    // var yearVal = OmdbDataObj.Year;
    // var actorsVal = OmdbDataObj.Actors;
    // var directorVal = OmdbDataObj.Director;
    // var genreVal = OmdbDataObj.Genre;
    // var plotVal = OmdbDataObj.Plot;
    // var imdbRatingVal = OmdbDataObj.imdbRating;
    // var arr = [yearVal, actorsVal, directorVal, genreVal, plotVal, imdbRatingVal];
    // console.log(arr);

    var movieData = {
        Year: OmdbDataObj.Year,
        Actors: OmdbDataObj.Actors,
        Director: OmdbDataObj.Director,
        Genre: OmdbDataObj.Genre,
        Plot: OmdbDataObj.Plot,
        Rating: OmdbDataObj.imdbRating
    };

    return movieData

};

function addsMovieDataToElement(movieData) {
    $("#movie-info").html(`
    <div class="container">
        <h1>Movie Info</h1>
        <p>Year: ${movieData.Year}</p>
        <p>Actors: ${movieData.Actors}</p>
        <p>Director: ${movieData.Director}</p>
        <p>Genre: ${movieData.Genre}</p>
        <p>Plot: ${movieData.Plot}</p>
        <p>Rating: ${movieData.Rating}</p>
    </div>
    `);
};

function getsYouTubeVideo(movieTitle) {
    // youtube api key for me: AIzaSyBk_PKFmfz9fvPSYTjkMAujTUcryc-tmJY;
    var youtubeAPIKey = "key=AIzaSyBk_PKFmfz9fvPSYTjkMAujTUcryc-tmJY&";
    var partUrl = "part=snippet&"
    var maxReturnedResults = "maxResults=1&";
    var searchQuery = `q=${movieTitle}+Official+Movie+Trailer&`
    var contentTypeSearched = "type=video&"
    var baseUrl = "https://www.googleapis.com/youtube/v3/search?"

    var searchRequestUrl = baseUrl + youtubeAPIKey + partUrl + maxReturnedResults + searchQuery + contentTypeSearched;

    console.log(searchQuery);

    $.get(searchRequestUrl)
        .then(function (youtubeDataObj) {
            console.log(youtubeDataObj);
            console.log(youtubeDataObj.items[0].id.videoId);
            var videoId = youtubeDataObj.items[0].id.videoId;
            addsMovieTrailerToElement(videoId);
        })

};

function addsMovieTrailerToElement(videoId) {
    console.log("?????? youtube element where");
    $("#movie-trailer").html(`
    <iframe width="600" height="400"
    src="https://www.youtube.com/embed/${videoId}">
    </iframe>
    `)
};