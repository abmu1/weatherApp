const body = document.querySelector('body');

const weatherCodes = {
  '0': `/clear_day.svg`,
  '1': `/partly_cloudy_day.svg`,
  '2': `/partly_cloudy_day.svg`,
  '3': `/fully_cloudy.svg`,
  '4': `/foggy.svg`,
  '5': `/light_rain.svg`,
  '6': `/rain.svg`,
  '7': `/cloudy_snowing.svg`,
  '8': `/heavy_rain.svg`,
  '9': `/thunderstorm.svg`
}

function currentBuilder(current, cityName) {
  const search = document.getElementById('search-icon');
  search.style.background = `url('./pngs/${body.dataset.theme}/search.svg')`;

  const changeTheme = document.getElementById('change-theme');
  changeTheme.classList.add('load');
  changeTheme.src = `./pngs/${body.dataset.theme}/mode.svg`;
  changeTheme.dataset.path = '/mode.svg'

  const temp = document.getElementById('temp');
  const svg = document.getElementById('current-svg');
  svg.classList.add('svg', 'load');
  const location = document.getElementById('location');
  const appTemp = document.getElementById('app-temp');
  const humidity = document.getElementById('hum');
  const wind = document.getElementById('wind');

  temp.innerHTML = '';
  svg.innerHTML = '';
  location.innerHTML = '';
  appTemp.innerHTML = '';
  humidity.innerHTML = '';
  wind.innerHTML = '';

  temp.innerText = `${current.temperature}\u00b0C`;
  let weatherCode = (current.weatherCode < 10) ? current.weatherCode : Math.floor((current.weatherCode) / 10);
  svg.src = './pngs/' + body.dataset.theme + weatherCodes[weatherCode];
  svg.dataset.path = weatherCodes[weatherCode];
  location.innerText = `${cityName[0].toUpperCase()}${cityName.substring(1)}`;
  appTemp.innerText = `${current.apparentTemperature}\u00b0C`;

  humidity.classList.add('values');
  const hsvg = document.createElement('img');
  hsvg.classList.add('load');
  if (current.humidity < 40) {
    hsvg.src = `./pngs/${body.dataset.theme}/low_humidity.svg`;
    hsvg.dataset.path = '/low_humidity.svg';
  }
  else if(current.humidity >= 40 && current.humidity < 60) {
    hsvg.src = `./pngs/${body.dataset.theme}/mid_humidity.svg`;
    hsvg.dataset.path = '/mid_humidity.svg';
  }
  else{
    hsvg.src = `./pngs/${body.dataset.theme}/high_humidity.svg`;
    hsvg.dataset.path = '/high_humidity.svg';
  }
  const hval = document.createElement('span');
  hval.innerText = current.humidity + '%';
  humidity.append(hsvg, hval)

  wind.classList.add('values');
  const wsvg = document.createElement('img');
  wsvg.classList.add('load');
  wsvg.src = `./pngs/${body.dataset.theme}/wind.svg`;
  wsvg.dataset.path = '/wind.svg';
  const wval = document.createElement('span')
  wval.innerText = current.windspeed + 'km/h';

  wind.append(wsvg, wval)
};

function dailyBuilder(daily) {
  const day = document.createElement('div');
  day.classList.add('title')
  day.innerText = daily.day;

  const high = document.createElement('p');
  high.classList.add('high');
  high.innerText = (`${daily.max}\u00b0C`);
  const low = document.createElement('p');
  low.classList.add('low');
  low.innerText = (`${daily.min}\u00b0C`);

  const osvg = document.createElement('img');
  osvg.classList.add('svg', 'load');
  let weatherCode = (daily.weatherCode < 10) ? daily.weatherCode : Math.floor((daily.weatherCode) / 10);
  osvg.dataset.path = weatherCodes[weatherCode];
  osvg.src = './pngs/' + body.dataset.theme + weatherCodes[weatherCode];

  const rise = document.createElement('span');
  rise.append(`Sunrise:`, document.createElement('br'), `${daily.sunrise.split('T')[1]}`);
  const set = document.createElement('span');
  set.append(`Sunset:`, document.createElement('br'), `${daily.sunset.split('T')[1]}`);

  const hilo = document.createElement('div');
  hilo.classList.add('value');

  const riseset = document.createElement('div');
  riseset.classList.add('spread', 'value');

  const container = document.createElement('div');
  container.classList.add('daily', 'weather-object');

  hilo.append(high, low);

  const div = document.createElement('div');
  div.classList.add('spread');
  div.append(osvg, hilo);

  riseset.append(rise, set);

  container.append(day, div, riseset);
  document.querySelector('.daily-container').append(container);
};

function hourlyBuilder(hourly) {
  const hour = document.createElement('div');
  hour.classList.add('title')
  hour.innerText = `${hourly.time.split('T')[1]}`;

  const temp = document.createElement('div');
  temp.innerText = `${hourly.temperature}\u00b0C`;

  const cloudCover = document.createElement('img');
  cloudCover.classList.add('svg', 'load');
  let weatherCode = (hourly.weatherCode < 10) ? hourly.weatherCode : Math.floor((hourly.weatherCode) / 10);
  cloudCover.dataset.path = weatherCodes[weatherCode];
  cloudCover.src = './pngs/' + body.dataset.theme + weatherCodes[weatherCode];
  
  const hdiv = document.createElement('div');
  hdiv.classList.add('values');
  const hsvg = document.createElement('img');
  hsvg.classList.add('load');
  if (hourly.humidity < 40) {
    hsvg.src = `./pngs/${body.dataset.theme}/low_humidity.svg`;
    hsvg.dataset.path = '/low_humidity.svg'
  }
  else if(hourly.humidity >= 40 && hourly.humidity < 60) {
    hsvg.src = `./pngs/${body.dataset.theme}/mid_humidity.svg`;
    hsvg.dataset.path = '/mid_humidity.svg'
  }
  else{
    hsvg.src = `./pngs/${body.dataset.theme}/high_humidity.svg`;
    hsvg.dataset.path = '/high_humidity.svg'
  }
  const hval = document.createElement('span');
  hval.innerText = hourly.humidity + '%';
  hdiv.append(hsvg, hval)

  const container = document.createElement('div');
  container.classList.add('hourly', 'weather-object');

  container.append(hour, temp, cloudCover, hdiv);
  document.querySelector('.hourly-container').append(container);
};

export {currentBuilder, dailyBuilder, hourlyBuilder};