function getHourlyWeather(cityName){
  let format = `&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,cloudcover,windspeed_10m,winddirection_10m,precipitation,weathercode`;
  return fetchWeatherData(cityName, format).then(res => {
    return res;
  }).catch(err => {
    return err;
  });
};
function getDailyWeather(cityName) {
  let format = `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset,weathercode`;
  return fetchWeatherData(cityName,format).then(res => {
    return res;
  }).catch(err => {
    return err;
  })
}



function fetchWeatherData(cityName, format) {
  return getCoordinates(cityName).then(res => {
    const latitude = res.latitude;
    const longitude = res.longitude;
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}${format}&timezone=auto&current_weather=true`,{mode:'cors'})
            .then(function(res) {
              return res.json();
            })
            .catch(err => {
              return err;
            });
  })
  .catch(err => {
    return err;
  });
};

function getCoordinates(cityName) {
  return fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`)
          .then(function(res) {
            if (res.ok){
              return res.json();
            };
            throw Error(`Some thing ain't right!`);
          })
          .then(function(res) {
            const results = res.results[0];
            const latitude = results.latitude;
            const longitude = results.longitude;
            const timezone = results.timezone;
            return {latitude,longitude,timezone}
          })
          .catch(function(err) {
            throw Error(err)
          });
};


export {getDailyWeather, getHourlyWeather};