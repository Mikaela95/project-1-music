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
  $("#search").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      url: "https://api.spotify.com/v1/me/",
      type: 'GET',
      headers: {
        // Hard coded for now
        Authorization:
          "Bearer " +
          "BQDzGkFSdByI0waMazKEv-Yv_7z67bG2NWt-dBo1FAk0pG2yf_YipeUkyFPivFotEatFNvQDLZfGzmx7t3erNkfxFKIeR9PTQ4nxQJMz1pftSnu0VL-NReX_adT8P0Jgmis35ZlrQJx16Es29hRuR_0V6Vyw-CE",
      },
      success: function (response) {
        console.log(response);
      },
    });
    console.log("testing http requests");
  });
};

getMethod();
