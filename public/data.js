// Global variables
let searchHistory = [];
let favourited = [];

// Icons
let starIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>`;
let starredIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" style="color: yellow">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>`;

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

/* $("#spotify-button").on("click", function() {
  $(".test-star").append(starIcon);
}); */

// Add to list
const addToList = (queryArtist, queryResponse) => {
  let idArtist = queryResponse.artists.items[0].id;
  // Push to array
  // searchArtist.push(queryArtist);

  // Append to list in the DOM - include star, id and artists name
  $("#search-history").append(
    `<li class="list-group-item">${queryArtist}<Button class="btn btn-primary" id="${idArtist}">${starIcon}</Button></li>`
  );
  $(`#${idArtist}`).on("click", function () {
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
