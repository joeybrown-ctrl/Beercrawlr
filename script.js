//Variables

let ZomatoKey = "88f5d4148f949c26ab2353fcf1db3a21";
let lat;
let long;
let selectedCity = "";
let breweryNameArray = []; //using it for testing purposes, might delete later 

//Functions

//with user approval, grabs users coordinate data
//will run on an onclick event when user selects "near me"

function getLocation() {
  if (navigator.geolocation) {
    let newLocation = navigator.geolocation.getCurrentPosition(function (
      position
    ) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(position);
      console.log(lat);
      console.log(long);
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
    //print out the results to verify functionality
    console.log(response);
    //adds list of breweries into an array
    //OBDB returns 20 results or less, we only need to grab 5

    //writes to "name" of display cards
    for (i = 1; i < 4; i++) {
      $("#name"+i).text(response[i-1].name);
      $("#type"+i).text(response[i-1].brewery_type);
      console.log(response[i-1].website_url)
      $("#link"+i).text("Website").attr("href", response[i-1].website_url);
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

    for (i = 1; i < 4; i++) {
      const restaurant = restaurants[i-1].restaurant;
      i = i.toString()
      $("#name"+i).text((restaurant).name);

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
//calling algolia function with input IDs as parameters

algoliaInput("#thirstyInput")
algoliaInput("#hungryInput")

//this works BUT it must  have lat and long first
//read to add to click event
//add error checking if a user denied location data sharing 
function getRestaurantByLoc() {
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
  let selectedCity = $("#thirstyInput").val();
  getBrewery(selectedCity);
  localStorage.setItem("city", selectedCity);
});

//this is currently grabbing input from "hungry" search
$("#hungry").click(function () {
  let selectedHungryCity = $("#hungryInput").val();
  getRestaurantByName(selectedHungryCity);
  localStorage.setItem("city", selectedHungryCity);
});

onLoad();
getLocation();

