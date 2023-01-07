
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
            getsYouTubeVideo(movieData.Title, movieData.Year);
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
    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#watchLaterModal">
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
            <form>
              <div class="mb-3">
                <label for="viewingpartymembers" class="col-form-label mt-3">Watch Party Members:</label>
                <input type="text" class="form-control" id="viewingpartymembers" placeholder="Who are you going to watch the movie with?">
              </div>
              <div class="mb-3" id="watchDate"></div>
              <div class="mb-3">
                <label for="Location" class="col-form-label">Location:</label>
                <input type="text" class="form-control" id="Location" placeholder="Where are you going to watch the movie?">
              </div>
              <div class="mb-3">
                <label for="addInfo" class="col-form-label">Additional Info:</label>
                <textarea class="form-control" rows="5" id="addInfo" placeholder="Add additional info such as scheduled movie start time here."></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-light" id="saveToWatchList">Add to Watch List</button>
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
    <iframe width="600" height="400"
    src="https://www.youtube.com/embed/${videoId}">
    </iframe>
    `)
};