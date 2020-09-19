//Variables

const ZomatoKey = "88f5d4148f949c26ab2353fcf1db3a21";
let lat;
let long;

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



//Click and Event Handlers 

getLocation();
