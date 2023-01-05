function performSearch() {
  // get search values
  var searchValue = document.getElementById("search").value;

  if (searchValue === null) {
    console.log("no value select");
    return;
  }

  // change what is visible on the screen
  document.getElementById("home").style.display = "none";
  document.getElementById("searchContent").style.display = "block";

  // call API
  // fetch

  // update the screen with values from API
  // document.getElementById('movieTitle').innerText = movieTitle;
}
