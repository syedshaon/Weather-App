import "./style.scss";
import loading from "./assets/giphy.gif";
import oops from "./assets/ooops.png";

/* Following is required for Bulma CSS Hamburger Menu */

/* const el = document.querySelector(".navbar-burger");

el.addEventListener("click", () => {
  const targetExpand = document.getElementById("navbarBasicExample");

  // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
  el.classList.toggle("is-active");
  targetExpand.classList.toggle("is-active");
}); */

/* Bulma CSS Hamburger Menu Ends */

/* npx kill-port 3000 */
const apiKey = `0af83f2b05c8420fbbd173558230905 `;

async function logJSONData(city) {
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
  const jsonData = await response.json();
  return jsonData;
}

// logJSONData("Paris");

// Take input from search form

function loadResults(val) {
  document.getElementById("weather-card").style.display = "block";
  document.getElementById("weather-image").innerHTML = `<img   src="${loading}" alt="Placeholder image" />`;
  document.getElementById("weather-image").style.display = "block";
  document.getElementById("title").innerText = ``;
  document.getElementById("condition").innerHTML = ``;
  document.getElementById("subtitle").innerText = ``;

  logJSONData(val)
    .then((weather) => {
      if (weather.error) {
        if (weather.error.code === 1003) {
          document.getElementById("title").innerText = "Please write your city name!";
          document.getElementById("title").classList.add("has-text-danger");
        } else {
          document.getElementById("title").innerText = weather.error.message;
        }
        document.getElementById("weather-image").innerHTML = `<img   src="${oops}" alt="Placeholder image" />`;
      } else {
        document.getElementById("weather-image").style.display = "none";
        console.log(weather);
        document.getElementById("title").innerText = `Weather for ${weather.location.name}, ${weather.location.country}`;

        document.getElementById("condition").innerHTML = `<p class="has-text-centered" id=""> ${weather.current.condition.text} </p> <img   src="https:${weather.current.condition.icon}" alt="weather image" "image is-fluid" />`;

        document.getElementById("subtitle").innerText = `Tempareture: ${weather.current.temp_c}°C, Humidity: ${weather.current.humidity}%,  Feels Like: ${weather.current.feelslike_c}°C`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

document.getElementById("weather-form-button").addEventListener("click", (e) => {
  e.preventDefault();
  const cityName = document.getElementById("weather-form").city.value;
  loadResults(cityName);
});

if (navigator.geolocation) {
  navigator.geolocation.watchPosition((position) => {
    loadResults(`${position.coords.latitude}, ${position.coords.longitude}`);
    console.log(`${position.coords.latitude}, ${position.coords.longitude}`);
  });
}
