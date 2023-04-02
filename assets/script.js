// declare variables to pull from the html

const searchButton = $("#searchButton");
const userCity = $("#userCity");
var recentSearches = $("#recentSearches");
const currentCity = $("#currentCity");
const currentDay = $("#currentDay");
const currentIcon = $("#currentWeatherIcon");
const currentTemp = $("#currentTemp");
const currentWind = $("#currentWind");
const currentHumidity = $("#currentHumidity");
const comingDay = $(".comindDay");
const comingCondition = $(".comingCondition");
const comingTemp = $(".comingTemp");
const comingWind = $(".comingWind");
const comingHumidity = $(".comingHumidity");

// set global variables

let apiKey = "16394bd5f12d0fe8084f59eea7224b7c";

// set a default city to populate the page with at the start

var chosenCity = "Cupertino";

// API Call

// current weather conditions
async function getCurrentWeather(chosenCity) {
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&units=imperial&APPID=" + apiKey;
    var rawData = await fetch(currentWeather);

    if (!rawData.ok) {
        userCity.val("");
        userCity.attr("placeholder", "No City found, please try again.");
        return;
    }

    var newData = await rawData.json();

    setCurrentWeather(newData);
    createRecentSearch(chosenCity);
    var recentSearchARR = loadRecentSearches();

    addRecentSearchButton(recentSearchARR);

    userCity.val("");
    userCity.attr("placeholder", "Choose another City.");
}

// 5 day forecast 

async function getFiveDay(chosenCity) {
    var forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + chosenCity + "&units=imperial&APPID=" + apiKey;
    var rawData = await fetch(forecast);
    if (!rawData.ok) {
        return;
    }
    var data = await rawData.json();
    setFiveDayForecast(data);
}

init();



// event handlers for the buttons

// page initializing function

// Go through api data for current forecast

// go through api data for 5 day forecast

// get weather data based on search input

// get weather data based on past search

// save past search and create button to display under search bar

// save past search to local storage

// load past searches from local storage

// update weather cards with current data