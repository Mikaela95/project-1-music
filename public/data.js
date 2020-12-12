// Test function - jQuery
const test = () => {
  $("#search").on("click", function (e) {
    e.preventDefault();
    console.log("testing");
  });
};

const getAccessToken = () => {
  function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  var params = getHashParams();

  var access_token = params.access_token,
    refresh_token = params.refresh_token;

  $.ajax({
    url: "/refresh_token",
    data: {
      refresh_token: refresh_token,
    },
  }).done(function (data) {
    access_token = data.access_token;
    console.log(access_token);
  });
};

// Test ajax - GET requests
const getMethod = () => {
  $("#test").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      url: "https://api.spotify.com/v1/me/",
      type: "GET",
      headers: {
        // Hard coded for now
        Authorization:
          "Bearer " +
          "BQCZcXmy79s8fYe7Ny-nQikEjjD2zebBBxwsf4X26zIkxMwT96hSCPyhd_bdFVu5qiw36Pmtqm3k8OVvu4znYkqvN9_k5KNWdbxOc64XTMPoe6r36rzBqBm4u0rgDd1AdHknmaO5AbSrywPUhkLu7p15jycG_EM",
      },
      success: function (response) {
        console.log(response);
      },
    });
    console.log("testing http requests");
  });
};

let favArray = [];
// Search for a song
const searchArtist = () => {
  $("#search").on("click", function (e) {
    e.preventDefault();
    let queryArtist = $("#input").val();
    console.log(queryArtist);
    $.ajax({
      url: `https://api.spotify.com/v1/search?q=${queryArtist}&type=artist`,
      type: "GET",
      headers: {
        // Hard coded for now
        Authorization:
          "Bearer " +
          "BQCZcXmy79s8fYe7Ny-nQikEjjD2zebBBxwsf4X26zIkxMwT96hSCPyhd_bdFVu5qiw36Pmtqm3k8OVvu4znYkqvN9_k5KNWdbxOc64XTMPoe6r36rzBqBm4u0rgDd1AdHknmaO5AbSrywPUhkLu7p15jycG_EM",
      },
      success: function (response) {
        let imageArtist = response.artists.items[0].images[0].url;
        //let artistGenre = response.artists.items[0].genres;
        $("#image-location").html(
          `<h1>Top 5 results: ${queryArtist}</h1> <img src=${imageArtist} />`
        );
        //let test = "test"
        $("#search-history")
          .append(`<li class="list-group-item">${queryArtist}<Button type="button" class="btn btn-warning" id="${queryArtist}" value="${queryArtist}">Add to favourites<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
        </svg></Button></li>`);
        for (let i = 1; i < 5; i++) {
          let topResults = response.artists.items[i].name;
          $("#image-location").append(`<h2>${topResults}</h2>`);
          console.log(topResults);
        }

        // Add favourite items to an array
        $(`#${queryArtist}`).on("click", function (e) {
          e.preventDefault();
          let result = $(this).attr("value");
          favArray.push(result);
          if(favArray !== undefined){
            //$("favourited-artists").hide();
            console.log("something in the array")
          }
          $("#test").append(`<h1>${result}</h1> <Button type="button" class="btn btn-danger">Remove from favourites</Button>`);
          console.log(favArray);
        });

        // Remove favourite items from array
        $(`#${queryArtist}`).on("click", function (e) {
          e.preventDefault();
          
          $("#test").append(`<h1>${result}</h1> <Button type="button" class="btn btn-danger">Remove from favourites</Button>`);
          console.log(favArray);
        });

      },
    });
  });
};

searchArtist();
getMethod();
