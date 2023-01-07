
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
            // getsYouTubeVideo(movieData.Title, movieData.Year);  //uncomment to enable youtube api
            getsYouTubeVideoTestingPurposes();  //uncomment for testing
        })

}

function extractsDatafromOmdbDataObj(OmdbDataObj) {
    var movieData = {
        Title: OmdbDataObj.Title,
        Year: OmdbDataObj.Year,
        Actors: OmdbDataObj.Actors,
        Director: OmdbDataObj.Director,
        Genre: OmdbDataObj.Genre,
        Plot: OmdbDataObj.Plot,
        Rating: OmdbDataObj.imdbRating,
        Poster: OmdbDataObj.Poster,
        Runtime: OmdbDataObj.Runtime
    };

    return movieData

};

function addsMovieDataToElement(movieData) {
    var movieInfoEl = $("#movie-info");

    movieInfoEl.html(``);

    var modalHTML = `<div id="modal-container" class="">
    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#watchLaterModal">
      <i class="fa-solid fa-clock fs-4"></i><br><span></span>
    </button>

    <div class="modal fade" id="watchLaterModal" tabindex="-1" aria-labelledby="watchLaterModalLabel"
      style="display: none;" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="watchLaterModalLabel">${movieData.Title}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <section class="text-white p-2" style="
            background-image: linear-gradient(to left, rgba(8, 8, 8, 0.5), rgba(0, 0, 0,0.9)), url(${movieData.Poster});
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 0.4em;
            ">
              <h2>Runtime:</h2>
              <p>${movieData.Runtime}</p>
              <h2>Plot:</h2>
              <p>${movieData.Plot}</p>
            </section>
            <form id="watchLaterForm">
              <div class="mb-3">
                <label for="viewingpartymembers" class="col-form-label mt-3">Watch Party Members:</label>
                <input type="text" class="form-control" id="viewingpartymembers" placeholder="Who are you going to watch the movie with?" autocomplete="off">
              </div>
              <div>
              <p>Date:</p>
                <div class="mb-3 justify-content-center row" id="watchDate"></div>
              </div>
              <div class="mb-3">
                <label for="location" class="col-form-label">Location:</label>
                <input type="text" class="form-control" id="location" placeholder="Where are you going to watch the movie?" autocomplete="off">
              </div>
              <div class="mb-3">
                <label for="addInfo" class="col-form-label">Additional Info:</label>
                <textarea class="form-control" rows="5" id="addInfo" placeholder="Add additional info such as scheduled movie start time here."></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" form="watchLaterForm" class="btn btn-light" data-bs-dismiss="modal" id="saveToWatchList">Add to Watch List</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;

    movieInfoEl.html(`
    <div class="container">
        <div class="d-flex justify-content-between align-items-center">
        <h1><u>${movieData.Title}</u></h1>
        ${modalHTML}
        </div>
        <p>Year: ${movieData.Year}</p>
        <p>Actors: ${movieData.Actors}</p>
        <p>Director: ${movieData.Director}</p>
        <p>Genre: ${movieData.Genre}</p>
        <p>Plot: ${movieData.Plot}</p>
        <p>Rating: ${movieData.Rating}</p>
    </div>
    `);

    movieInfoEl.show();

    $("#watchDate").datepicker();

    $("#watchLaterForm").submit(submitsFormActions);

    function submitsFormActions(e) {
        e.preventDefault();

        var viewingpartymembersVal = $("#viewingpartymembers").val();
        var locationVal = $("#location").val();
        var addInfoVal = $("#addInfo").val();
        var currentDate = $("#watchDate").datepicker("getDate");

        var epocMillisecondsTime = currentDate.getTime();

        console.log([viewingpartymembersVal, locationVal, addInfoVal, epocMillisecondsTime]);
        movieInfoEl.html(``);
        movieInfoEl.hide();

        var movieTrailerEl = $("#movie-trailer");
        movieTrailerEl.html(``);
        movieTrailerEl.hide();

        var movieSaveDataObj = {
            Title: movieData.Title,
            Runtime: movieData.Runtime,
            Plot: movieData.Plot,
            WatchBuddies: viewingpartymembersVal,
            WatchLocation: locationVal,
            DateEpocMS: epocMillisecondsTime,
            AddInfo: addInfoVal,
            Poster: movieData.Poster
        };

        addsToHistory(movieSaveDataObj);

    }

};

function getsYouTubeVideo(movieTitle, movieYear) {
    // youtube api key for me: AIzaSyBk_PKFmfz9fvPSYTjkMAujTUcryc-tmJY;
    var youtubeAPIKey = "key=AIzaSyBk_PKFmfz9fvPSYTjkMAujTUcryc-tmJY&";
    var partUrl = "part=snippet&"
    var maxReturnedResults = "maxResults=1&";
    var searchQuery = `q=${movieTitle}+${movieYear}+Official+Movie+Trailer&`
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

    var movieTrailerEl = $("#movie-trailer");

    movieTrailerEl.html(``);

    movieTrailerEl.html(`
    <iframe style="width: 100%; height: 100%;" class="p-2"
    src="https://www.youtube.com/embed/${videoId}">
    </iframe>
    `);
    movieTrailerEl.show();
};

// gets history from local storage
function getsHistory() {
    return JSON.parse(localStorage.getItem("movieScheduleUserData")) || [];
};

// saves history to local storage
function savesHistory(arr) {
    localStorage.setItem("movieScheduleUserData", JSON.stringify(arr));
};

// adds valid search term to history array
function addsToHistory(movieSaveDataObj) {

    console.log("hello????");

    var movieScheduleUserData = getsHistory();

    movieScheduleUserData.push(movieSaveDataObj);

    // sorts arr earliest to latest date schedule using epoc time in ms before saving to local storage
    movieScheduleUserData.sort(function (a, b) { return a.DateEpocMS - b.DateEpocMS });

    savesHistory(movieScheduleUserData);
};

function getsYouTubeVideoTestingPurposes() {

            addsMovieTrailerToElement("TbQm5doF_Uc");

};