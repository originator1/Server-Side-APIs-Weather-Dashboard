var hiddenEls = document.querySelectorAll(".hide");
//grab search inputText box
var inputText = document.querySelector("#inputText");
//grab search button
var searchBtn = document.querySelector("#clickToFetch");

var historyBox = document.querySelector(".historyBox");

var searchNameEl = document.querySelector('#searchName');

//ONE DAY FORECAST ------------------------------------------------
var oneDayTempEl = document.querySelector('#oneDayTemp');
var oneDayWindEl = document.querySelector('#oneDayWind');
var oneDayHumEl = document.querySelector('#oneDayHum');
var oneDayUvEl = document.querySelector('#oneDayUV');
//FIVE DAY FORECAST------------------------------------------------
var fiveDayDiv = document.querySelector('#fiveDay');

//CREATE EMPTY ARRAY FOR CITIES SEARCHED(BUTTONS); IF CITY NOT ALREADY IN ARRAY, NEW SEARCH BUTTON PUSHED TO LIST--
var cityArray = [];
console.log(cityArray);

//one call api current uv index: current.uvi
//https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

//adding event listener to searchBtn / clicking initates api call

function searchCity(valueText) {
  //event.preventDefault();
  //var valueText = inputText.value;
  hiddenEls.forEach((el)=> {
    el.classList.remove('hide');
  })

  var oneDayQueryUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    valueText +
    "&units=imperial&appid=c4a186ac3a697bd2fb942f498b34386c";

  fetch(oneDayQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      savingCity(valueText);
      console.log("my data",data);
      let searchName = data.name;
      console.log("checking searchname: " + searchName);
      let temp = data.main.temp;
      let wind = data.wind.speed;
      let humidity = data.main.humidity;
      appendOneDay(temp, searchName, wind, humidity);
      // document.querySelector('#oneDayTemp').append(temp + String.fromCharCode(176) + "F");
      // document.querySelector('#searchName').append(searchName);
      
    });
    // .catch((err) => alert("Not a city name!"));
    const fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + valueText + "&appid=c4a186ac3a697bd2fb942f498b34386c"
    fetch(fiveDayUrl)
      .then(function (response) {
        return response.json();
        
      })
      .then (function(fiveData) {
        console.log("This is my 5 day object");
        console.log("my fiveDay data obj from api", fiveData);
        
        dayObjects = [];
        //can adjust amount of days by changing incrementor(i)
        for (i = 0; i < 5; i++) {
           dayObjects.push(fiveData.list[i]);
        }

        
        const newFiveDiv = document.querySelector('.fiveDay');
       

        if (newFiveDiv.innerHTML !== null) {
          newFiveDiv.innerHTML = "";
        };

        // dayObjects = [dayOne, dayTwo, dayThree, dayFour, dayFive];
        dayObjects.map((day) => {
          let temp = day.main.temp; 
          let hum = day.main.humidity;
          let wind = day.wind.speed;
          console.log(day);
          const newFiveDiv = document.querySelector('.fiveDay');
          let count = 1;
          let fTemp = parseInt(((temp - 273.15) * 9/5) + 32);

          newFiveDiv.insertAdjacentHTML('afterbegin', 
          `<div class="genDiv" style="font-size: 1rem">
              <p<span id='twoTemp'>${fTemp}${String.fromCharCode(176) + "F"}</span></p>
              <p><span id='twoWind'>Hum: ${hum}</span></p>
              <p><span id='twoHum'>${wind}MPH Winds</span></p>
          </div>`); 
        });

      })
}

//append one day data
function appendOneDay(temp, searchName, wind, humidity) {
  // if(searchNameEl.length > 0) {
  //   searchNameEl.children.remove();
  // };
  if (searchNameEl.value !== null) {
    searchNameEl.innerHTML = "";
  };
  if (oneDayTempEl.value !== null) {
    oneDayTempEl.innerHTML = "";
  };
  if (oneDayWindEl.value !== null) {
    oneDayWindEl.innerHTML = "";
  };
  if (oneDayHumEl.value !== null) {
    oneDayHumEl.innerHTML = "";
  };
  
  oneDayTempEl.append(temp + String.fromCharCode(176) + "F");
  searchNameEl.append(searchName);
  oneDayWindEl.append(wind + "MPH");
  oneDayHumEl.append(humidity);
  // oneDayUvEl.append()
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

  // console.log("My cities aray: " + cityArray);
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
  console.log("results from localstorage get",searchedCities);

  searchedCities.forEach((cityEl) => {
    console.log("each element in searched cities(localstorage)", cityEl);
    var cityBtn = document.createElement("button");
    cityBtn.setAttribute('class', 'generatedBtn btn-primary')
    cityBtn.textContent = cityEl;
    //add class to the buttons
    cityBtn.classList.add("pastCities");
    //add value attribute with the city name
    cityBtn.setAttribute("value", cityEl)
    historyBox.appendChild(cityBtn);
  });
}
//FETCHES API DATA WHEN ONE OF PREVIOUS SEARCHED CITY BUTTONS CLICKED FROM cityArray
document.querySelector(".historyBox").addEventListener("click", function(event){
  event.preventDefault();
    //event is the click event
    //event.target is the item we clicked on
    //ever.target.value will return the value of the value attribute of that item
    var x = event.target.value;
    //pass the value of x to searchCity function as an argument
    searchCity(x);
    
})

displayCities()
//FETCHES API DATA WHEN SEARCH BUTTON CLICKED
searchBtn.addEventListener("click", function(){
    var searchedCityValue = inputText.value;
    //runs search city api function on inputText value of past city clicked
    searchCity(searchedCityValue);
});









