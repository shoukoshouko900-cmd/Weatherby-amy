// =============================
// Weather API Key
// =============================

const API_KEY = "87c055e05de35f99d12a248b6b19645f";


// =============================
// HTML Elements
// =============================

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");
console.log("Autocomplete loaded");
cityInput.addEventListener("input", async ()=>{

    let query = cityInput.value;

    suggestions.innerHTML="";

    if(query.length < 2){
        return;
    }


    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=87c055e05de35f99d12a248b6b19645f`
    );


    const cities = await response.json();

if(cities.length === 0){
    suggestions.style.display = "none";
    return;
}


    cities.forEach(place=>{

        let option = document.createElement("div");

        option.className="suggestion-item";


        option.textContent =
        `${place.name}, ${place.state || ""}, ${place.country}`;


        option.onclick=()=>{

    cityInput.value = place.name;

    suggestions.innerHTML = "";
    suggestions.style.display = "none";

    searchBtn.click();
};


        suggestions.appendChild(option);

    });

});
suggestions.style.display = "block";
const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");


// =============================
// Search Button
// =============================

searchBtn.addEventListener("click", () => {

    const cityName = cityInput.value;
    const speech = new SpeechSynthesisUtterance();

speech.text = `天気情報を表示します ${cityName}`;

speech.lang = "ja-JP";

speech.rate = 1;

speech.volume = 0.3;

window.speechSynthesis.cancel();

window.speechSynthesis.speak(speech);

    if(cityName === "")
    {
        alert("Please enter a city.");
        return;
    }

    getWeather(cityName);

});
cityInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        searchBtn.click();

    }

});

// =============================
// Fetch Weather
// =============================

async function getWeather(cityName){

    try{

        const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        const data = await response.json();
        if (data.cod !== 200) {
    alert("City not found!");
    return;
}

        console.log(data);

        updateWeather(data);
    }

    catch(error){

        alert("Something went wrong.");

        console.log(error);

    }

}


// =============================
// Update Website
// =============================

function updateWeather(data){

    temperature.innerHTML =
    Math.round(data.main.temp) + "°C";

    city.innerHTML =
    data.name;

    description.innerHTML =
    data.weather[0].description;

    humidity.innerHTML =
    data.main.humidity + "%";

    wind.innerHTML =
    data.wind.speed + " m/s";

    pressure.innerHTML =
    data.main.pressure + " hPa";

    feelsLike.innerHTML =
    Math.round(data.main.feels_like) + "°C";
    const icon = data.weather[0].icon;
console.log("Weather icon code:", icon);
    const weatherIcons = {
    "01d": "icons/clear-day.svg",
    "01n": "icons/clear-night.svg",

    "02d": "icons/clear-day.svg",
    "02n": "icons/clear-night.svg",

    "03d": "icons/clear-day.svg",
    "03n": "icons/clear-night.svg",

    "04d": "icons/clear-day.svg",
    "04n": "icons/clear-night.svg",

    "09d": "icons/rain.svg",
    "09n": "icons/rain.svg",

    "10d": "icons/rain.svg",
    "10n": "icons/rain.svg",

    "11d": "icons/thunderstorms.svg",
    "11n": "icons/thunderstorms.svg",

    "50d": "icons/mist.svg",
    "50n": "icons/mist.svg"
};

weatherIcon.src = weatherIcons[icon];

}
const currentTime = document.getElementById("currentTime");

function updateClock() {
    const now = new Date();

    currentTime.textContent = now.toLocaleTimeString();

}

updateClock();
setInterval(updateClock, 1000);