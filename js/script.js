/*
    Assignment #4
    {Zarna Savaliya}
*/

$(function () {
    // your code here
    const x = document.getElementById("locationhere");
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  
    function showPosition(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      x.innerHTML =
        "Current location:" +
        "Latitude: " +
        latitude +
        "<br>Longitude: " +
        longitude;
      document.getElementById("locationhere").innerHTML = x.innerHTML;
  
      var storedLocation = localStorage.getItem("previousLocation");
  
      if (storedLocation) {
        var previousLocationTag = document.createElement("p");
        previousLocationTag.innerHTML = "Previous Location:" + storedLocation;
        document.getElementById("content").appendChild(previousLocationTag);
  
        var welcomeTag = document.createElement("h2");
        welcomeTag.innerHTML = "Welcome back to the page!";
        document.getElementById("content").appendChild(welcomeTag);
  
     
        // Compare the current and previous locations and calculate the distance
        var distance = calcDistanceBetweenPoints(
          latitude,
          longitude,
          storedLocation.split(",")[0],
          storedLocation.split(",")[1]
        );
        var distanceTag = document.createElement("p");
        var distanceText = document.createTextNode(
          "You have traveled " + distance + " meters since your last visit."
        );
        distanceTag.appendChild(distanceText);
        document.getElementById("content").appendChild(distanceTag);

        var km = distance / 1000;
        var kmTag = document.createElement("p");
        var kmText = document.createTextNode(
            "You have traveled " +  km.toFixed(1) + " km since your last visit."
        );
        kmTag.appendChild(kmText);
        document.getElementById("content").appendChild(kmTag);
      } else {
        document.getElementById("welcomeMessage").innerHTML =
          "Welcome to the page for the first time!";
      }
  
      // Store the current location in localStorage
      localStorage.setItem("previousLocation", latitude + "," + longitude);
    }
  
    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
      console.log("lat1", lat1);
      console.log("lon1", lon1);
      console.log("lat2", lat2);
      console.log("lon2", lon2);
      var toRadians = function (num) {
        return (num * Math.PI) / 180;
      };
      var R = 6371000; // radius of Earth in metres
      var φ1 = toRadians(lat1);
      var φ2 = toRadians(lat2);
      var Δφ = toRadians(lat2 - lat1);
      var Δλ = toRadians(lon2 - lon1);
  
      var a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
      return R * c;
    }
  });
  