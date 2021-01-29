const container = document.querySelector(".info");
const form = document.querySelector("form");
const input = document.querySelector(".input");

let temp;
let feelsLikeTemp;
let windSpeed;
let currentTime;

const getWeatherInfo = ((searchTerm) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=0bbed8fc1e7f8d5a58d829c42d02cc29`)
    .then((res) => res.json())
    .then((response) => {
        printWeatherInfo(response)
    })
    .catch((err) => {
        console.log(err);
    });
});

const getTime = (timezone) => {
    const now = new Date();
    let minutes = now.getMinutes();
    let hours = (now.getHours()) + timezone / 3600;
    hours >= 24 ? hours = hours - 24 : hours;
    hours.toString().length < 2 ? hours = "0" + hours : hours;
    (minutes.toString().length < 2) ? minutes = "0" + minutes : minutes;
    currentTime = `${hours}:${minutes}`
};

const createHTML = (response) => {
    return `
    <div class="firstLine">
        <div>
            <h2>${response.name}, ${response.sys.country}</h2>
            <h3>${response.weather[0].description}</h3>
        </div>
        <img src=http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png>
    </div>
    <p>Local time: ${currentTime}</p>
    <p>${temp}°C </p>
    <p>Feels like: ${feelsLikeTemp}°C</p>
    <p>${response.clouds.all}% cloud cover</p>
    <p>Wind Speed: ${windSpeed}mph</p>
    <p>${response.main.humidity}% humidity</p>
    `
};

const printWeatherInfo = (response) => {
    temp = Math.floor(response.main.temp - 273.15);
    feelsLikeTemp = Math.floor(response.main.feels_like - 273.15);
    windSpeed = Math.floor(response.wind.speed);
    getTime(response.timezone)
    container.innerHTML = createHTML(response)
};

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        getWeatherInfo(input.value);
        input.value = "";
    });
});

getWeatherInfo("London");
