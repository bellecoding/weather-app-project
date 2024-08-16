function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#city");
    let countryElement = document.querySelector("#country");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let weekDayElement = document.querySelector("#week-day");
    let date = new Date (response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    countryElement.innerHTML = response.data.country; 
    weekDayElement.innerHTML = formatDate(date);
    timeElement.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
    cityElement.innerHTML =  `${response.data.city},`;
    descriptionElement.innerHTML = `${response.data.condition.description}`;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = ` ${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = `${temperature}°C`;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday" ];

   let day = days [date.getDay()];
    
       if (minutes < 10) {
         minutes = `0 ${minutes}`;
       }
 
   return `${day}`; 
}


function searchCity(city) {
let apiKey = "ddafb333ff3taa6005d55d473416odb3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
   
    searchCity(searchInput.value);
}

function displayForecast () {
   let forecastElement = document.querySelector("#forecast");
  
   let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
   let forecastHtml = "";

   days.forEach(function (day) {
   forecastHtml = 
   forecastHtml +
   `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">☀️</div>
    <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
        <strong>16</strong>
    </div>
    <div class="weather-forecast-temperature">9</div>
  </div>
</div>
`;
   });
   forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
displayForecast();
 

 