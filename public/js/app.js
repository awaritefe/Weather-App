console.log("Client side JS");

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");

const weatherInfo = document.querySelector("#weather-info");
const locationInfo = document.querySelector("#location");

// weatherInfo.textContent = "Weather Baby";
// locationInfo.textContent = "Camden";

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = searchInput.value;

  weatherInfo.textContent = "Loading...";
  locationInfo.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (weatherInfo.textContent = data.error);
      }
      weatherInfo.textContent = data.dataForecast;
      locationInfo.textContent = data.location;
    });
  });
});
