const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function dailyFactory(res) {
  const weatherObjects = [];
  const result = res.daily;
  const dates = result.time;
  const precipitations = result.precipitation_sum;
  const sunrises = result.sunrise;
  const sunsets = result.sunset;
  const maxs = result.temperature_2m_max;
  const mins = result.temperature_2m_min;
  const weatherCodes = result.weathercode;
  for (let i = 0; i < 7; ++i){
    let day = Days[new Date(dates[i]).getDay()];
    let precipitation = precipitations[i];
    let sunrise = sunrises[i];
    let sunset = sunsets[i];
    let max = maxs[i];
    let min = mins[i];
    let weatherCode = weatherCodes[i];
    let weatherObject = {day, precipitation, sunrise, sunset, max, min, weatherCode};
    weatherObjects.push(weatherObject);
  };
  return weatherObjects;
};

function hourlyFactory(res) {
  const weatherObjects = [];
  const currentWeather = res.current_weather;
  const ctTime = currentWeather.time;
  const hourly = res.hourly;
  const temperatures = hourly.temperature_2m;
  const times = hourly.time;
  const apparentTemperatures = hourly.apparent_temperature;
  const cloudCovers = hourly.cloudcover;
  const precipitations = hourly.precipitation;
  const humidities = hourly.relativehumidity_2m;
  const weatherCodes = hourly.weathercode;
  let index = 0;
  while (true) {
    if (times[index] === ctTime) {
      let apparentTemperature = apparentTemperatures[index];
      let humidity = humidities[index];
      let precipitation = precipitations[index]
      let cloudCover = cloudCovers[index];
      let weatherCode = weatherCodes[index];
      currentWeather['apparentTemperature'] = apparentTemperature;
      currentWeather['humidity'] = humidity;
      currentWeather['precipitation'] = precipitation;
      currentWeather['cloudCover'] = cloudCover;
      currentWeather['weatherCode'] = weatherCode;
      break;
    };
    index += 1;
  };
  for (let i = 0; i < 24; i++) {
    index += 1;
    let time = times[index];
    let temperature = temperatures[index];
    let cloudCover = cloudCovers[index];
    let precipitation = precipitations[index]
    let humidity = humidities[index]
    let weatherCode = weatherCodes[index];
    weatherObjects.push({time, temperature, cloudCover, precipitation, humidity, weatherCode});
  };
  return {currentWeather,weatherObjects};
};

export {dailyFactory, hourlyFactory};