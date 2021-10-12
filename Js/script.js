//grab search inputText box
var inputText = document.querySelector("#inputText");
//grab search button
var searchBtn = document.querySelector("#clickToFetch");

var historyBox = document.querySelector(".historyBox");

var oneDayTempEl = document.querySelector('#oneDayTemp');
var searchNameEl = document.querySelector('#searchName');

var cityArray = [];

//one call api current uv index: current.uvi
//https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

//adding event listener to searchBtn / clicking initates api call

function searchCity(valueText) {
  //event.preventDefault();
  //var valueText = inputText.value;

  var queryUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    valueText +
    "&units=imperial&appid=c4a186ac3a697bd2fb942f498b34386c";

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      savingCity(valueText);
      console.log(data);
      let searchName = data.name;
      console.log("checking searchname: " + searchName);
      let temp = data.main.temp;
      let wind = data.wind.speed;
      let humidity = data.main.humidity;
      appendOneDay(temp, searchName);
      // document.querySelector('#oneDayTemp').append(temp + String.fromCharCode(176) + "F");
      // document.querySelector('#searchName').append(searchName);
      
    })
    // .catch((err) => alert("Not a city name!"));
}

//append one day data
function appendOneDay(temp, searchName) {
  if(searchNameEl.length > 0) {
    searchNameEl.children.remove();
  };
  
  oneDayTempEl.append(temp + String.fromCharCode(176) + "F");
  searchNameEl.append(searchName);
};  


//push that city into array
function savingCity(cityName) {
  //create city name array

  //check if city is already in the array
  if (cityArray.indexOf(cityName) !== -1) {
    //every time push new city into array,
    return;
  }
  cityArray.push(cityName);

  console.log(cityArray);
  //store array in local storage
  //setItem to store array in local storage

  localStorage.setItem("savedSearches", JSON.stringify(cityArray));
  displayCities();
}

//foreach to go thorugh array and create button

function displayCities() {
  var searchedCities = JSON.parse(localStorage.getItem("savedSearches")) || [];
  //clear the area out before adding new buttons to avoid duplications;
  historyBox.innerHTML="";
  console.log(searchedCities);

  searchedCities.forEach((cityEl) => {
    console.log(cityEl);
    var cityBtn = document.createElement("button");
    cityBtn.textContent = cityEl;
    //add class to the buttons
    cityBtn.classList.add("pastCities");
    //add value attribute with the city name
    cityBtn.setAttribute("value", cityEl)
    historyBox.appendChild(cityBtn);
  });
}

document.querySelector(".historyBox").addEventListener("click", function(event){
    //event is the click event
    //event.target is the item we clicked on
    //ever.target.value will return the value of the value attribute of that item
    var x = event.target.value;
    //pass the value of x to searchCity function as an argument
    searchCity(x);
})

displayCities()

searchBtn.addEventListener("click", function(){
    var searchedCityValue = inputText.value;
    //pass the value of searchedCityValue to searchCity function as an argument
    searchCity(searchedCityValue);
});


// LOCAL STORAGE: window.localStorage
// SAVE TO STORAGE: .setItem   GET FROM STORAGE: .getItem

//     <button class="style1" data-location="austin">Austin</button>
//     <button class="style1" data-location="chicago">Chicago</button>
//     <button class="style1" data-location="newyork">New York</button>
//     <button class="style1" data-location="orlando">Orlando</button>
//     <button class="style1" data-location="sanfran">San Francisco</button>
//     <button class="style1" data-location="seattke">Seattle</button>
//     <button class="style1" data-location="denver">Denver</button>
//     <button class="style1" data-location="atlanta">Atlanta</button>

// creating function to append past searches to page as element with class
// create element: document.createElement()  appending: element.append()
// var valueText = inputText.value;

// PROJECT GUIDELINES
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
