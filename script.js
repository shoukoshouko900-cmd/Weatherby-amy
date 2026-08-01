// =============================
// Weather API Key
// =============================

const API_KEY = "87c055e05de35f99d12a248b6b19645f";


// =============================
// HTML Elements
// =============================

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const description = document.getElementById("description");
const country = document.getElementById("country");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");
const errorSign = document.getElementById("errorSign");

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
function animateTemperature(targetTemp) {

    let current = 0;
    targetTemp = Math.round(targetTemp);

    const timer = setInterval(() => {

        current++;

        temperature.innerHTML = current + "°C";

        if (current >= targetTemp) {
            clearInterval(timer);
            temperature.innerHTML = targetTemp + "°C";
        }

    }, 30);

}
// =============================
// Fetch Weather
// =============================

async function getWeather(cityName){

    try{

        const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        const data = await response.json();
        if(data.cod != 200){

    showErrorSign();   // <-- Add this line

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

animateTemperature(data.main.temp);

    city.innerHTML =
    data.name;
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
country.innerHTML = regionNames.of(data.sys.country);

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
// =============================
// Error Sign Animation
// =============================

function showErrorSign(){

    errorSign.classList.add("show");

    setTimeout(()=>{

        errorSign.classList.remove("show");

    },2000);

}