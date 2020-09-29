//Variables

let ZomatoKey = "88f5d4148f949c26ab2353fcf1db3a21";
let selectedCity = "";
let breweryNameArray = [];



//Functions


//runs on click event, grabs user location and searchers Zomato API
function getLocation() {
  if (navigator.geolocation) {
    let newLocation = navigator.geolocation.getCurrentPosition(function (
      position
    ) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      getRestaurantByLoc(lat, long);
    });
  }
}

//runs on click event, grabs and writes brewery information to index.html
function getBrewery(selectedCity) {
  let city = selectedCity;
  let queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {

    //writes content to display cards
    for (let i = 1; i < 7; i++) {
      let brewType = response[i - 1].brewery_type
      $("#name" + i).text(response[i - 1].name);
      $("#type" + i).text("Brewery Type: " + brewType);

      // code here to pick right image based on brewery type 

      if (brewType === "Micro") {
        $("#img" + i).attr("src", "https://raw.githubusercontent.com/joeybrown-ctrl/Beercrawlr/master/images/tatiana-rodriguez-D_Rfjj3XV8M-unsplash.jpg");
      } else if (brewType === "regional") {
        $("#img" + i).attr("src", "https://raw.githubusercontent.com/joeybrown-ctrl/Beercrawlr/master/images/elevate-9EY5ckCX9iQ-unsplash.jpg");
      } else if (brewType === "brewpub") {
        $("#img" + i).attr("src", "https://raw.githubusercontent.com/joeybrown-ctrl/Beercrawlr/master/images/evan-dvorkin-NCmog4xinew-unsplash.jpg");
      } else if (brewType === "large") {
        $("#img" + i).attr("src", "https://raw.githubusercontent.com/joeybrown-ctrl/Beercrawlr/master/images/daniel-vogel-sVothhm7iRI-unsplash.jpg");
      } else if (brewType === "planning") {
        $("#img" + i).attr("src", "https://raw.githubusercontent.com/joeybrown-ctrl/Beercrawlr/master/images/claude-piche-EHbtjmz7hvw-unsplash.jpg");
      } else if (brewType === "bar") {
        $("#img" + i).attr("src", "https://raw.githubusercontent.com/joeybrown-ctrl/Beercrawlr/master/images/luke-southern-gW7QRXDSvec-unsplash.jpg");
      } else if (brewType === "contract") {
        $("#img" + i).attr("src", "https://raw.githubusercontent.com/joeybrown-ctrl/Beercrawlr/master/images/fred-crandon-fulpvaLUX3A-unsplash.jpg");
      } else if (brewType === "proprietor") {
        $("#img" + i).attr("src", "https://raw.githubusercontent.com/joeybrown-ctrl/Beercrawlr/master/images/radovan-rgJ1xwQsoJc-unsplash.jpg");
      }

      $("#link" + i).text("Click Here for Website ").attr("href", response[i - 1].website_url);
    }
  });
}

//runs on click event, grabs and writes restaurant information to index.html
function getRestaurantByName(selectedCity) {
  let city = selectedCity;
  let cityID;

  let cityIDURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city;
  $.ajax({
    url: cityIDURL,
    headers: {
      "user-key": "88f5d4148f949c26ab2353fcf1db3a21",
    },
    method: "GET",
  }).then(function (response) {

    // this takes the searched city and finds its Zomato ID, converts to string
    cityID = response.location_suggestions[0].id;

    cityID = cityID.toString();


    //assign next query with acquired cityID
    let queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&count=15&sort=rating&order=desc";

    //Query to get restaurants with city id 

    $.ajax({
      url: queryURL,
      headers: {
        "user-key": "88f5d4148f949c26ab2353fcf1db3a21",
      },
      method: "GET",
    }).then(function (response) {

      const restaurants = response.restaurants;

      for (i = 1; i < 7; i++) {
        const restaurant = restaurants[i - 1].restaurant;
        $("#name" + i).text((restaurant).name);
        $("#type" + i).text("Restaurant Type: " + restaurant.establishment[0]);
        $("#link" + i).text("Click Here for Menu ").attr("href", restaurant.menu_url);
        $("#img" + i).attr("src", restaurant.thumb);

        //add error catch for undefined restaurant type 

      }

      if (restaurant.thumb === "") {
        $("#img"+i).attr("src", "images/default.jpg");
      }

    }


    });


  });
}

//adds algolia functionality to search bars
function algoliaInput(input) {
  places({
    appId: 'plJQ1KF0K79P',
    apiKey: 'bc174a9842192d2d3601b8b23345d187',
    container: document.querySelector(input),
    templates: {
      value: function (suggestion) {
        return suggestion.name;
      }
    }
  }).configure({
    type: 'city',
    aroundLatLngViaIP: false,
  });
}

//searches Zomato API by user location 
function getRestaurantByLoc(lat, long) {

  let queryURL = "https://developers.zomato.com/api/v2.1/search?count=15&lat=" + lat + "&lon=" + long + "&sort=rating&order=desc";

  $.ajax({
    url: queryURL,
    headers: {
      "user-key": "88f5d4148f949c26ab2353fcf1db3a21",
    },
    method: "GET",
  }).then(function (response) {
    console.log(response);

    for (i = 1; i < 7; i++) {
      const restaurants = response.restaurants;
      const restaurant = restaurants[i - 1].restaurant;
      $("#name" + i).text((restaurant).name);
      $("#type" + i).text("Restaurant Type: " + restaurant.establishment[0]);
      $("#link" + i).text("Click Here for Menu: ").attr("href", restaurant.menu_url);
      $("#img" + i).attr("src", restaurant.thumb);

      //adds default image if no image content is present in Zomato 
      if (restaurant.thumb === "") {
        $("#img"+i).attr("src", "images/default.jpg");
      }

    }


  });
}

//writes last searched to page to avoid poor presentation
function onLoad() {
  let input = localStorage.getItem("city");
  getBrewery(input);
}

//Click and Event Handlers

$("#thirsty").click(function () {
  let selectedCity = $("#searchInput").val();
  getBrewery(selectedCity);
  localStorage.setItem("city", selectedCity);
});

$("#hungry").click(function () {
  let selectedHungryCity = $("#searchInput").val();
  getRestaurantByName(selectedHungryCity);
  localStorage.setItem("city", selectedHungryCity);
});

$("#nearMe").click(function () {
  getLocation();
});


onLoad();
algoliaInput("#searchInput")
