import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
   searchBox: document.querySelector('#search-box'),
   countryList: document.querySelector('.country-list'),
   countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(featchResponse, DEBOUNCE_DELAY));

function featchResponse(e) {
   clearHtml();
   if (e.target.value === "") {
      return;
   }
   fetchCountries(e.target.value)
     .then(getAllObjektsFromPromises)
     .catch(onError);
}

function getAllObjektsFromPromises(data) {
   const dataLength = data.length;
   if (dataLength > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      return;
   }
   if (dataLength >= 2 && dataLength <= 10) {
      refs.countryList.insertAdjacentHTML('beforeend', countryList(data));
      return;
   }

   refs.countryInfo.insertAdjacentHTML('beforeend', countryInfo(data));
}

function countryList(data) {
   return data.map(
      obj =>
         `<li class="list__item"><img class="list__img" src="${obj.flags.svg}" alt="${obj.name.official}"><h2 class="list__title">${obj.name.official}</h2></li>`
   )
      .join('');
}

function countryInfo(data) {
  return data
    .map(
      obj =>
        `
      <div class="wrapper">
        <img class="img" src="${obj.flags.svg}" alt="${obj.name.official}">
        <h2 class="title">${obj.name.official}</h2>
      </div>
      <p class="description">Capital: <span class="descriptio__span">${
        obj.capital
      }</span></p>
      <p class="description">Population: <span class="descriptio__span">${
        obj.population
      }</span></p>
      <p class="description">Languages: <span class="descriptio__span">${languagesCountry(
        obj.languages,
      )}</span></p>
      `,
    )
    .join('');
}

function languagesCountry(data) {
   return Object.values(data).join(', ');
}

function onError() {
   Notify.failure('Oops, there is no country with that name');
}

function clearHtml() {
   refs.countryInfo.innerHTML = '';
   refs.countryList.innerHTML = '';
}
