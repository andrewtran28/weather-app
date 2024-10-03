//function farhenheitToCelsius

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

  // async function setWeatherData (location) {
  //   await getWeatherData(location).then(weather => {
  //     let data = new Data(
  //       weather.resolvedAddress,
  //       weather.description,
  //       weather.currentConditions.temp,
  //       weather.currentConditions.feelslike,
  //       weather.currentConditions.conditions,
  //       weather.currentConditions.precip,
  //       weather.currentConditions.sunrise,
  //       weather.currentConditions.sunset,
  //       weather.currentConditions.uvindex,
  //     );
  //     let poop = weather.address;
  //     console.log(poop);
  //     console.log(data.address);
  //     return data;
  //   });

  //   return data;
  // }

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
    function getResponse(){
        let weatherDesc = response.description;
        const img = document.querySelector('img');
        fetch('https://api.giphy.com/v1/gifs/translate?api_key=gQdd7Nh0r9O4mABU6OGEyprphbETt9gR&s=${weatherDesc}', {mode: 'cors'})
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            console.log(response.data.images.original.url);
            img.src = response.data.images.original.url;
          });
    }

    return { getResponse }
})();

const WeatherApp = (() => {
  async function renderWeather (location) {
    const weather = await Weather.getWeatherData(location);

    if (weather === null) {
      return false
    }

    let data = new Weather.Data(
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

    console.log(data);

    const container = document.querySelector(".weather-cont");
    container.style.display = "";
    container.textContent = "";

    container.innerHTML = `
            <div class="location">${data.address}</div>
            <div class="condition">${data.condition}</div>
            <div class="temp">Temperature: ${data.temp}F</div> <div class="feelslike">(Feels Like: ${data.feelslike}F)</div>
            <div class="humidity">Humidity: ${data.humidity}%</div>
            <div class="uv-index">UV Index: ${data.uv}</div>
            <div class="sunrise">Sunrise: ${data.sunrise}</div> <div class="sunset">Sunset: ${data.sunset}</div>
    `;
  }

  renderWeather("Ottawa");

}) (Weather, GIPHY);

