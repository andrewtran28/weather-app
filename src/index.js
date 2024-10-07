import "./styles.css";

const Weather = (function() {
	async function getWeatherData(location) {
    try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=UKJVE382CNZGQKZZXEV4EYCDQ`, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`Bad Network Request. Please input correct location`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      alert (error);
      return null;
    }
  }

  function Data(address, desc, temp, feelslike, condition, precip, humidity, sunrise, sunset, uv) {
    this.address = address;
    this.desc = desc;
    this.temp = temp;
    this.feelslike = feelslike;
    this.condition = condition;
    this.precip = precip;
    this.humidity = humidity;
    this.sunrise = sunrise;
    this.sunset = sunset;
    this.uv = uv;
  }

  return { getWeatherData, Data };
})();

const GIPHY = (() => {
    function getGIF(description){
        const img = document.querySelector(".giphy");
        fetch(`https://api.giphy.com/v1/gifs/translate?api_key=gQdd7Nh0r9O4mABU6OGEyprphbETt9gR&s=${description}`, {mode: 'cors'})
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            img.style.display="";
            img.src = response.data.images.original.url;
          });
    }

    return { getGIF }
})();

const WeatherApp = (() => {
  let currentLocation = "";
  let data;

  async function getWeather(location) {
    console.log(location);
    const weather = await Weather.getWeatherData(location);

    if (weather === null) {
      return false
    }

    data = new Weather.Data(
      weather.resolvedAddress,
      weather.description,
      weather.currentConditions.temp,
      weather.currentConditions.feelslike,
      weather.currentConditions.conditions,
      weather.currentConditions.precip,
      weather.currentConditions.humidity,
      weather.currentConditions.sunrise,
      weather.currentConditions.sunset,
      weather.currentConditions.uvindex,
    );

    if (btn_units.textContent === "Fahrenheit (°F)") {
      renderWeather("fahrenheit");
    }
    else if (btn_units.textContent === "Celsius (°C)") {
      renderWeather("celsius");
    }

    const giphy = await GIPHY.getGIF(data.condition);
  }

  function renderWeather(units) {
    const container = document.querySelector(".weather-cont");
    container.innerHTML="";
    container.style.display = "";

    let symbol = "F";
    if (units === "celsius") {
      let temp_Celsius = Math.round(((data.temp - 32)*(5/9)) * 10) / 10;
      let feelslike_Celsius = Math.round(((data.feelslike - 32)*(5/9)) * 10) / 10;
      symbol = "C";

      container.innerHTML = `
      <div class="address">${data.address}</div>
      <div class="condition">${data.condition}</div>
      <div class="temp">Temperature: ${temp_Celsius} °${symbol}</div>
      <div class="feelslike">(Feels Like: ${feelslike_Celsius} °${symbol})</div>
      <div class="humidity">Humidity: ${data.humidity}%</div>
      <div class="uv-index">UV Index: ${data.uv}</div>
      <div class="sunrise">Sunrise: ${data.sunrise}</div>
      <div class="sunset">Sunset: ${data.sunset}</div>
      `;
    }

    else if (units === "fahrenheit") {
      symbol = "F";

      container.innerHTML = `
        <div class="address">${data.address}</div>
        <div class="condition">${data.condition}</div>
        <div class="temp">Temperature: ${data.temp} °${symbol}</div>
        <div class="feelslike">(Feels Like: ${data.feelslike} °${symbol})</div>
        <div class="humidity">Humidity: ${data.humidity}%</div>
        <div class="uv-index">UV Index: ${data.uv}</div>
        <div class="sunrise">Sunrise: ${data.sunrise}</div>
        <div class="sunset">Sunset: ${data.sunset}</div>
      `;
    }
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location_input = document.getElementById("location").value;

    if (location_input != "") {
      currentLocation = location_input;
      getWeather(currentLocation);
    }
  });

  const btn_units = document.getElementById("units");
  btn_units.addEventListener("click", () => {
    if (currentLocation != "") {
      if (btn_units.textContent === "Fahrenheit (°F)") {
        btn_units.textContent = "Celsius (°C)";
        renderWeather("celsius");
      } 
      else if (btn_units.textContent === "Celsius (°C)") {
        btn_units.textContent = "Fahrenheit (°F)";
        renderWeather("fahrenheit");
      }
    }
   });

  return { renderWeather }
}) (Weather, GIPHY);