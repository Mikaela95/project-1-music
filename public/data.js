// Global variables
let searchHistory = [];
let favourited = [];

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
    `<li class="list-group-item">${queryArtist}<button class="btn btn-primary" id="${idArtist}"><span class="fa fa-star"></span></button></li>`
  );

  $(`#${idArtist}`).on("click", function () {
    // change button and star colour classes
    $(this).toggleClass("btn-warning")
    // add a favourite
    addToFavourites();
  });
};

// Add to favourites
const addToFavourites = () => {
  // favourited.push() - will need id
  console.log("ive been added to favourites");
};

// Remove from favourites
const removeFromFavourites = () => {};
