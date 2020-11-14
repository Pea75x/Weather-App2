/// date and time
function getDate (timestamp){
let now = new Date(timestamp);

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let number = now.getDate();
let months = ["Jan", "Feb", "mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[now.getMonth()];
return `${day} ${number} ${month}`;
}

function getHours (timestamp) {
let now = new Date(timestamp);
let minutes = now.getMinutes();
if (minutes<10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
if (hours<10) {
  hours = `0${hours}`;}
  return `${hours}:${minutes}`;
}


///change of details
function showCityTemp(response) {

  let temperature = document.querySelector("#temperature");
  tempC = Math.round(response.data.main.temp);
  temperature.innerHTML = tempC

  let country = response.data.sys.country;
  let name = response.data.name;
  document.querySelector("h1").innerHTML = `${name},${country}`; 

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#weather").innerHTML = response.data.weather[0].description;
 
  document.querySelector("#wind").innerHTML= Math.round(response.data.wind.speed);

let icon = document.querySelector("#icon");
icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

let h3 = document.querySelector("h3");
h3.innerHTML = getDate(response.data.dt*1000);

let h2 = document.querySelector("h2");
h2.innerHTML= getHours(response.data.dt*1000);
}

function showCityForecast (response) {
let forecastElement = document.querySelector(".forecast");
forecastElement.innerHTML = null;
let forecast = null; 


for (let index = 0; index<5; index++) {
forecast = response.data.list[index];
forecastElement.innerHTML += `
<div class="col"> 
    <div class="more">
        <h4><strong> ${getHours(forecast.dt*1000)}</strong> </h4>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" style="width: 50px;"/>
        <p><strong>${Math.round(forecast.main.temp_max)}°</strong>/${Math.round(forecast.main.temp_min)}°</p>
    </div>
</div>`
}}


function search (city) {
let apiKey = "c2016b2ed087ee4f9a30ab9ed51cf5fb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showCityTemp);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showCityForecast);

}

function cityInput (event){
event.preventDefault();
let cityHeading = document.querySelector("#cityText").value;
search (cityHeading);
}

let searchButton = document.querySelector("form")
searchButton.addEventListener("submit", cityInput);

///geolocation 
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

let apiKey = "c2016b2ed087ee4f9a30ab9ed51cf5fb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showCityTemp);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showCityForecast);

}

function currentLocation (){
navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", currentLocation);

function convertF () {
let temperature = document.querySelector("#temperature");
temperature.innerHTML = Math.round((tempC *9)/5 + 32);
celsius.classList.add("toClick");
fahrenheit.classList.remove("toClick");
}

function convertC () {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(tempC);
  celsius.classList.remove("toClick");
  fahrenheit.classList.add("toClick");
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertF);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertC);

let tempC = null
search("london");