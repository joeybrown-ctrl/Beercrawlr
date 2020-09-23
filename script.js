//Variables

let ZomatoKey = "88f5d4148f949c26ab2353fcf1db3a21";
let lat;
let long;

let breweryNameArray = [];
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
function getBrewery() {
  //city will become a variable and/or parameter. 
  //using seattle as a test
  let city = "seattle";
  let queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {

    //adds list of breweries into an array
    for (i = 0; i < response.length; i ++) {
      breweryNameArray.push(response[i].name);
    }

  });
}

//function to query Zomato to get restaurant names -->"hungry?"
function getRestaurant() {
  //static variables for now, but function will be written to accept city lat and long and then plug into the api call 
  let city = "Seattle";
  let zomatoLat = "&lat="+lat;
  let zomatoLong ="$lon="+long;

   let queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + city + "&entity_type=city&count=5&lon=-&sort=rating&order=asc";
 
  $.ajax({
    url: queryURL,
    headers: {
       'user-key' : "88f5d4148f949c26ab2353fcf1db3a21"
    },
    method: 'GET'
 }).then(function(response) {
   console.log(response)
  
   for (i = 0; i <= 5; i ++){
     console.log(response.restaurants[i].restaurant.name)
   }
 }
 )

}








//Click and Event Handlers 

// example code from Homework to capture user data from text input field and then make it our parameter 
// $(".btn").click(function () {
//   let selectedCity = $("#userInput").val();

// getLocation(selectedCity);
// getBrewery(selectedCity);

// });

getLocation();
getBrewery();
getRestaurant();
