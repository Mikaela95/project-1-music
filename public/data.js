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
      Authorization: "Bearer " + accessToken,
    },
    success: function (response) {
      return addToList(queryArtist, response);
    },
  });
});

// Add to list
const addToList = (queryArtist, queryResponse) => {
  let idArtist = queryResponse.artists.items[0].id;
  // Push to array
  // searchArtist.push(queryArtist);

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
  $(".favourite-container").show();

  $("#favourited-list").append(
    `<li class="list-group-item" id=${artistClicked.id} name=${artistClicked.value}>${artistClicked.value}<button class="btn btn-warning" id="${artistClicked.id}" value="${artistClicked.value}"><span class="fa fa-star"></span></button><button name=${artistClicked.value} class="btn btn-danger"><span class="fa fa-trash"></span></button></li>`
  );

  $(`button[name=${artistClicked.value}]`).on("click", function () {
    console.log("button clicked");
    $(`li[name=${artistClicked.value}]`).remove();
  });
};

// Remove from favourites
const removeFromFavourites = (itemRemove) => {
  console.log(itemRemove);
  console.log("remove from favourites");
};
