//grab search inputText box
var inputText = document.querySelector('#inputText');
//grab search button
var searchBtn = document.querySelector('#clickToFetch');

var historyBox = document.querySelector(".historyBox");


//one call api current uv index: current.uvi
//https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}


//adding event listener to searchBtn / clicking initates api call
searchBtn.addEventListener('click', function() {
    var valueText = inputText.value;
    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q="+valueText+
    "&appid=c4a186ac3a697bd2fb942f498b34386c";
    fetch(queryUrl)
     .then(function(response) {
         return response.json();
     }).then(function(data) {
         console.log(data);
     })
    .catch(err => alert("Not a city name!"))
});


//LOCAL STORAGE: window.localStorage
//SAVE TO STORAGE: .setItem   GET FROM STORAGE: .getItem

/* <button class="style1" data-location="austin">Austin</button>
    <button class="style1" data-location="chicago">Chicago</button>
    <button class="style1" data-location="newyork">New York</button>
    <button class="style1" data-location="orlando">Orlando</button>
    <button class="style1" data-location="sanfran">San Francisco</button>
    <button class="style1" data-location="seattke">Seattle</button>
    <button class="style1" data-location="denver">Denver</button>
    <button class="style1" data-location="atlanta">Atlanta</button> */

    //creating function to append past searches to page as element with class
//create element: document.createElement()  appending: element.append() 
var valueText = inputText.value;





//PROJECT GUIDELINES
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city