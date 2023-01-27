import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputSearch: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputSearch.addEventListener(
  'input',
  debounce(searchCountry, DEBOUNCE_DELAY)
);

function searchCountry(e) {
  const choiceCountry = e.target.value.trim();
  resetMarkap();

  if (choiceCountry === '') return;

  fetchCountries(choiceCountry).then(res => {
    if (res === undefined) return;
    else if (res.length > 10) {
      return Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (res.length === 1) {
      makeMarkapInfo(res);
    } else {
      makeMarkapList(res);
    }
  });
}

function makeMarkapInfo(countrys) {
  countrys.map(country => {
    const countryItem = `

    <div class = "wrap_flag">
      <img src="${country.flags.svg}" alt="" class = "flags">
        <p class = "capital">${country.name.official}</p>
    </div>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <p>Languages: ${Object.values(country.languages)}</p>
    `;
    refs.countryInfo.innerHTML = countryItem;
  });
}

function makeMarkapList(countrys) {
  refs.countryList.innerHTML = countrys.reduce((acc, country) => {
    country = `<li class = "wrap_flag_list">
                <img src="${country.flags.svg}" alt="" class = "flags">
                <p>${country.name.official}</p>
              </li>`;
    return acc + country;
  }, '');
}

function resetMarkap() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
