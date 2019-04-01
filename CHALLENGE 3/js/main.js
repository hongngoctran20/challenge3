var date = new Date();
document.getElementById("day").innerHTML = "Today is " + date;

var locations = [
        ['Tokyo, Japan', 35.6684411,139.6004396,11],
        ['Amsterdam, The Netherlands', 52.3547321,4.8284118,12],
        ['London, United Kingdom', 51.5287714,-0.2420248,11],
        ['Paris, France', 48.8589506,2.2768485,12],
        ['New York, United States', 40.6976684,-74.260553,10],
        ['Sydney, Australia', -33.8473551,150.6511033,10],
        ['Beijing, China', 39.9390715,116.1165865,10],
        ['Moscow, Russia', 55.5815182,36.8237499,9],
        ['Ottawa, Canada', 45.2502958,-76.0811266,10],
        ['New Delhi, India', 28.5275195,77.0685563,11],
        ['Jakarta, Indonesia', -6.2293866,106.6890884,11],
        ['Buenos Aires, Argentina', -34.6156624,-58.50351,12],
        ['Helsinki, Finland', 60.1102086,24.7378197,10],
        ['Antananarivo, Madagascar', -18.8873009,47.3720851,11],
        ['Cairo, Egypt', 30.0595581,31.223359,13],
        ['Hanoi, Vietnam', 20.9740862,105.3717964,10]
    ];

// When the user clicks the marker, an info window opens.
function initMap() {
  var myLatLng = new google.maps.LatLng(52.35, 4.82);

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng,
    mapTypeId: 'roadmap'
    });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
  }
}

//stars
  function calculatePosition(){
    let noOfStars = 100
    let starsContainer = document.querySelector("#stars");
    for (let i = 0; i < noOfStars; i++) {
      let starDiv = document.createElement("div", "");
      starDiv.className = "star";
      starsContainer.appendChild(starDiv);
    }
    let stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
      let starSize = Math.floor(Math.random() * (6-1)+1);
      let randVerticalPos = Math.floor(Math.random() * 101);
      let randHorizontalPos = Math.floor(Math.random() * 101);
      star.style.right = randHorizontalPos + "%";
      star.style.top = randVerticalPos + "%";
      star.style.width = starSize + "px";
      star.style.height = starSize + "px";
      star.style.animationDelay = randVerticalPos + "s";
    });
  };
  calculatePosition();

//weather
const loc = document.getElementById("location");
const temNum = document.getElementById("temperature-num");
const temScale = document.getElementById("temperature-scale");
const weatherCon = document.getElementById("weather-condition");
const weatherIcon = document.getElementById("weather-icon");

// get location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  } else {
    loc.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// get weather data according to the location
function getWeather(lat, long) {
  const root = "https://fcc-weather-api.glitch.me/api/current?";
  fetch(`${root}lat=${lat}&lon=${long}`, { method: "get" })
    .then(resp => resp.json())
    .then(data => {
      updateDataToUI(data.name, data.weather, data.main.temp);
    })
    .catch(function(err) {
      console.error(err);
    });
}

// update the data from API to DOM
function updateDataToUI(location, weather, temp) {
  weatherIcon.innerHTML = `<img src="${weather[0].icon}" />`;
  weatherCon.innerHTML = weather[0].main;
  loc.innerHTML = location;
  temNum.innerHTML = `${temp}`;
}

window.onload = function() {
  getLocation();
};