//Variables

let ZomatoKey = "88f5d4148f949c26ab2353fcf1db3a21";
let selectedCity = "";
let breweryNameArray = []; 

//using it for testing purposes, might delete later 

//Functions

//with user approval, grabs users coordinate data
//will run on an onclick event when user selects "near me"

function getLocation() {
  if (navigator.geolocation) {
    let newLocation = navigator.geolocation.getCurrentPosition(function (
      position
    ) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      console.log(position);
      console.log(lat);
      console.log(long);
      getRestaurantByLoc(lat, long);
    });
  }
}
//function to query OBDB to get brewery names --> "thirsty?"
function getBrewery(selectedCity) {
  let city = selectedCity;
  let queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
 
    //writes content to display cards
    for (let i = 1; i < 7; i++) {
      let brewType = response[i-1].brewery_type
      $("#name"+i).text(response[i-1].name);
      $("#type"+i).text("Brewery Type: " + brewType);

      // code here to pick right image based on brewery type 

      if (brewType === "micro") {
        $("#img"+i).attr("src", "images/tatiana-rodriguez-D_Rfjj3XV8M-unsplash.jpg");
      } else if (brewType === "regional") {
        $("#img"+i).attr("src", "images/elevate-9EY5ckCX9iQ-unsplash.jpg");
      } else if (brewType === "brewpub") {
        $("#img"+i).attr("src", "images/evan-dvorkin-NCmog4xinew-unsplash.jpg");
      } else if (brewType === "large") {
        $("#img"+i).attr("src", "images/daniel-vogel-sVothhm7iRI-unsplash.jpg");
      } else if (brewType === "planning") {
        $("#img"+i).attr("src", "images/claude-piche-EHbtjmz7hvw-unsplash.jpg");
      } else if (brewType === "bar") {
        $("#img"+i).attr("src", "images/luke-southern-gW7QRXDSvec-unsplash.jpg");
      } else if (brewType === "contract") {
        $("#img"+i).attr("src", "images/timothy-dykes-Lq1rOaigDoY-unsplash.jpg");
      } else if (brewType === "proprietor") {
        $("#img"+i).attr("src", "images/radovan-rgJ1xwQsoJc-unsplash.jpg");
      }

      $("#link"+i).text("Click Here for Website: ").attr("href", response[i-1].website_url);
    }
  });
}

//function to query Zomato to get restaurant names -->"hungry?"
function getRestaurantByName(selectedCity) {
  //static variables for now, but function will be written to accept city lat and long and then plug into the api call
  let city = selectedCity;
  let cityID;

  let cityIDURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city;
  // query Zomato to get City ID 
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
    console.log(typeof(cityID));
    console.log(cityID);

    //assign next query with acquired cityID
    let queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id="+ cityID + "&entity_type=city&count=15&sort=rating&order=desc";

    //Query to get restaurants with city id 

  $.ajax({
    url: queryURL,
    headers: {
      "user-key": "88f5d4148f949c26ab2353fcf1db3a21",
    },
    method: "GET",
  }).then(function (response) {
    console.log(response);


    // code to write HTML to index goes HERE 

    //writes to "name" of display cards
    const restaurants = response.restaurants;

    for (i = 1; i < 7; i++) {
      const restaurant = restaurants[i-1].restaurant;
      $("#name"+i).text((restaurant).name);
      $("#type"+i).text("Restaurant Type: " + restaurant.establishment[0]);
      $("#link"+i).text("Click Here for Menu: ").attr("href", restaurant.menu_url); 
      $("#img"+i).attr("src", restaurant.thumb);

      //add error catch for undefined restaurant type 

    }

   });


  })  ;
}

//algolia function 
function algoliaInput(input){
  places({
    appId: 'plJQ1KF0K79P',
    apiKey: 'bc174a9842192d2d3601b8b23345d187',
    container: document.querySelector(input),
    templates: {
      value: function(suggestion) {
        return suggestion.name;
      }
    }
  }).configure({
    type: 'city',
    aroundLatLngViaIP: false,
  });
}

//this works BUT it must  have lat and long first
//read to add to click event
//add error checking if a user denied location data sharing 

function getRestaurantByLoc(lat, long) {

  console.log(lat);
  console.log(long);

  let queryURL = "https://developers.zomato.com/api/v2.1/search?count=15&lat="+ lat +"&lon="+ long + "&sort=rating&order=desc";

  $.ajax({
    url: queryURL,
    headers: {
      "user-key": "88f5d4148f949c26ab2353fcf1db3a21",
    },
    method: "GET",
  }).then(function (response) {
    console.log(response);

    //code to write to HTML goes HERE

  });
}

function onLoad() {
  let input = localStorage.getItem("city");
  getBrewery(input);
}
//Click and Event Handlers

//this is currently grabbing input from "thirsty" search
$("#thirsty").click(function () {
  let selectedCity = $("#searchInput").val();
  getBrewery(selectedCity);
  localStorage.setItem("city", selectedCity);
});

//this is currently grabbing input from "hungry" search
$("#hungry").click(function () {
  let selectedHungryCity = $("#searchInput").val();
  getRestaurantByName(selectedHungryCity);
  localStorage.setItem("city", selectedHungryCity);
});


onLoad();
getLocation();


//calling algolia function with input ID as parameters
algoliaInput("#searchInput")


//note for Chris from Joey: we'll need to put in conditional logic to match the images to brewery type. I'm thinking if/else statements.
