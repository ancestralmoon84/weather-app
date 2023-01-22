function formatDate() {
  let realTime = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = realTime.getDate();
  let year = realTime.getFullYear();
  let day = days[realTime.getDay()];
  let month = months[realTime.getMonth()];
  let hour = realTime.getHours();
  hour = hour < 10 ? "0" + hour : hour;
  let minute = realTime.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;

  let time = `${day}, ${month} ${date}, ${year}, ${hour}:${minute}`;
  return time;
}

let updateTime = document.querySelector("#datetime");
updateTime.innerHTML = `${formatDate()}`;

function submitCity(event) {
  event.preventDefault();
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let city = document.querySelector("#change-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
  Clink.classList.add("active");
  Flink.classList.remove("active");
}
let enterCity = document.querySelector("#search-city");
enterCity.addEventListener("submit", submitCity);

function showTemp(response) {
  celsiusTemp = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#sky").innerHTML = response.data.weather[0].main;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#RF").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  let nextDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  nextDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="row">
    <div class="col-4 forecast-table">
        ${day}
    </div>
    <div class="col-4 forecast-table">
        30/20°C
    </div>
    <div class="col-4 forecast-table">
    <img src="http://openweathermap.org/img/wn/50d@2x.png" width="40" />
    </div>
  </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}
showForecast();

function showPosition(position) {
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemp);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  Clink.classList.remove("active");
  Flink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  Clink.classList.add("active");
  Flink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#Flink");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);
let celsiusLink = document.querySelector("#Clink");
celsiusLink.addEventListener("click", showCelsiusTemp);
