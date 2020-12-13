// Global variables
let searchHistory = [];
let favourited = [];

// Initialise favourited container to hide
$(".favourite-container").hide();

// Query Spotify API and return response
$("#search").on("click", function (e) {
  e.preventDefault();
  let queryArtist = $("#input").val();
  $.ajax({
    url: `https://api.spotify.com/v1/search?q=${queryArtist}&type=artist`,
    type: "GET",
    headers: {
      // Retrieve access token from window - (global variable)
      Authorization:
        "Bearer " +
        "BQDiv2YRIILV0lG8ee-ip3DsnuwMyaOITK-whZNul54BNJn3P5wlVwkkLx3nIatG0wbzyvcOKwWNXNMLOD7LaagCwwDseHbHZPnb3bvpZBRpZWZcOWGaijvEOKux9_olKKUw74A6Dbuulubcxqy0Xag2Xj0j_YU",
    },
    success: function (response) {
      let imageArtist = response.artists.items[0].images[0].url;
      $("#artist-thumbnail").html(
        `<h1>Top Result: ${queryArtist}</h1> <img src=${imageArtist} />`
      );
      return addToList(queryArtist, response);
    },
  });
});

// Add to list
const addToList = (queryArtist, queryResponse) => {
  let idArtist = queryResponse.artists.items[0].id;

  // Append to list in the DOM - include id and artists name
  $("#search-history").append(
    `<li class="list-group-item">${queryArtist}<button class="btn btn-primary" id="${idArtist}" value="${queryArtist}"><span class="fa fa-star"></span></button></li>`
  );

  $(`#${idArtist}`).on("click", function () {
    // change button and star colour classes
    //$(this).toggleClass("btn-warning");
    // add a favourite
    addToFavourites(this);
  });
};

// Add to favourites
const addToFavourites = (artistClicked) => {
  // Show once called - need to add verification
  $("#favourited-list").append(
    `<li class="list-group-item" id=${artistClicked.id} name=${artistClicked.value}>${artistClicked.value}<button class="btn btn-warning" id="${artistClicked.id}" value="${artistClicked.value}"><span class="fa fa-star"></span></button><button name=${artistClicked.value} class="btn btn-danger"><span class="fa fa-trash"></span></button></li>`
  );

  $(".favourite-container").show();

  // Remove from favourites
  $(`button[name=${artistClicked.value}]`).on("click", function () {
    console.log("button clicked");
    $(`li[name=${artistClicked.value}]`).remove();
  });
};
