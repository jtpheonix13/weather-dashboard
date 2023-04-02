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
const comingDay = $(".comingDay");
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

searchButton.on("click", loadSearch);
recentSearches.on("click", loadPastCity);

// page initializing function

function init() {
    getCurrentWeather(chosenCity);
    getFiveDay(chosenCity);
    var recentSearchARR = loadRecentSearches();
    addRecentSearchButton(recentSearchARR);
}

// Go through api data for current forecast

function setCurrentWeather(newData) {
    var cityName = newData.name;
    currentCity.text(cityName);
    currentDay.text(dayjs().format(" MM-DD-YYYY"));
    var icon = newData.weather[0].icon;
    currentIcon.attr("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
    var temp = parseInt(newData.main.temp);
    currentTemp.text("Temp: " + temp + "\u00B0F");
    var wind = newData.wind.speed;
    currentWind.text("Wind: " + wind + " MPH");
    var humidity = newData.main.humidity;
    currentHumidity.text("Humidity: " + humidity + "%");

}

// go through api data for 5 day forecast

function setFiveDayForecast(data) {
    var startTime = 2;

    for (var i = 0; i < comingDay.length; i++) {
        var date = dayjs(data.list[startTime].dt_txt).format("MM-DD-YYYY");
        $(comingDay[i]).text(date);
        var icon = data.list[startTime].weather[0].icon;
        $(comingCondition[i]).attr("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
        var temp = parseInt(data.list[startTime].main.temp);
        $(comingTemp[i]).text("Temp: " + temp + "\u00B0F");
        var wind = data.list[startTime].wind.speed;
        $(comingWind[i]).text("Wind: " + wind + " MPH");
        var humidity = data.list[startTime].main.humidity;
        $(comingHumidity[i]).text("Humidity: " + humidity + "%");
        startTime += 8;
    }
}

// get weather data based on search input

function loadSearch() {
    
    chosenCity = userCity.val().trim();
    updateScreen(chosenCity);
    console.log(chosenCity);
}

// get weather data based on past search

function loadPastCity() {
    var pastCity = target.textContent;
    updateScreen(pastCity);
}

// save past search and create button to display under search bar

function createRecentSearch(chosenCity) {
    var recentSearchARR = loadRecentSearches();
    recentSearchARR = $.grep(recentSearchARR, function(obj){
        return obj != chosenCity;
    })

    recentSearchARR.unshift(chosenCity);

    if (recentSearchARR > 7) {
        recentSearchARR.pop();
    }

    saveRecentSearches(recentSearchARR);
}

function addRecentSearchButton(recentSearchARR) {
    const recentCityUl = $("#recentSearches");

    recentCityUl.empty();

    for (var search of recentSearchARR) {
        var newLi = $("<li></li>").text(search);
        recentCityUl.append(newLi);
    }
}

// save past search to local storage

function saveRecentSearches(recentSearchARR) {
    localStorage.setItem("recentCitiesSearch", JSON.stringify(recentSearchARR));
}

// load past searches from local storage

function loadRecentSearches() {
    var recentSearchARR = JSON.parse(localStorage.getItem("recentCitiesSearch")) || [];
    return recentSearchARR;
}

// update weather cards with current data

function updateScreen(chosenCity) {
    getCurrentWeather(chosenCity);
    getFiveDay(chosenCity);
}