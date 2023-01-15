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
}
let enterCity = document.querySelector("#search-city");
enterCity.addEventListener("submit", submitCity);

function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#sky").innerHTML = response.data.weather[0].main;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
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
