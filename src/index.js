import {getDailyWeather, getHourlyWeather} from "./getWeatherData";
import { dailyFactory, hourlyFactory } from "./factories";
import {currentBuilder, dailyBuilder, hourlyBuilder} from './element_builders';

let cityName = 'london';
let theme = 'dark';
async function controller() {
  const input = document.getElementById('search');
  input.blur();
  cityName = input.value || cityName;
  try{
    const daily = dailyFactory(await getDailyWeather(cityName));
    const hourly = hourlyFactory(await getHourlyWeather(cityName));
    clear();
    currentBuilder(hourly.currentWeather, cityName);
    daily.forEach(day => {
      dailyBuilder(day);
    });
    hourly.weatherObjects.forEach(hour => {
      hourlyBuilder(hour);
    });
    input.value = '';
  }catch(err) {
    const input = document.getElementById('search'); 
    input.setCustomValidity('Enter a valid city name!');
    input.reportValidity();
    input.oninput = () => {
      input.setCustomValidity('');
    };
    return;
  };
};

function clear() {
  const clearables = document.querySelectorAll('.clear');
  clearables.forEach(clearable => {
    clearable.innerHTML = '';
  });
};

const search = document.getElementById('search-icon');
search.addEventListener('click', (e) => {
  e.preventDefault();
  controller();
});

const root = document.querySelector(':root');
const body = document.querySelector('body');
const changeTheme = document.getElementById('change-theme');
changeTheme.addEventListener('click', () => {
  const svgs = document.querySelectorAll('.load')
  let temp = body.dataset.theme;
  body.dataset.theme = theme;
  theme = temp;

  search.style.background = `url('./pngs/${body.dataset.theme}/search.svg')`

  svgs.forEach(svg => {
    svg.src = './pngs/' + body.dataset.theme + svg.dataset.path;
  })

  let rootStyle = getComputedStyle(root);
  let bg = rootStyle.getPropertyValue('--bg');
  let colo = rootStyle.getPropertyValue('--colo');
  root.style.setProperty('--bg', colo);
  root.style.setProperty('--colo', bg);
})

controller();
