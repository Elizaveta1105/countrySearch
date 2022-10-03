import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from '../src/js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputField = document.getElementById("search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

inputField.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
    const inputValue = inputField.value.trim()
    countryList.innerHTML = ' '
    countryInfo.innerHTML = ' '
 
    if(inputValue.length <= 1) {
        return Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
    }    
    fetchCountries(inputValue).then(onRenderCountry).catch(onError)
}  
    

function onRenderCountry(data) {
    data.forEach(object => {
        const { flags: { svg }, 
        name: { common }, 
        capital, 
        languages, 
        population } 
        = object

    if(data.length === 1) {
        const text = `<img class="country-icon" src='${svg}' alt='flag' width='60' />
        <h2 class='county-info_name'>${common}</h2>
        <p class='country-info_description'>
          Capital:
          <span class='country-info_val'>${capital}</span>
        </p>
        <p class='country-info_description'>
          Population:
          <span class='country-info_val'>${population}</span>
        </p>
        <p class='country-info_description'>
          Language:
          <span class='country-info_val'>${Object.values(languages).join(', ')}</span>
        </p>`;

        return countryInfo.innerHTML = text

    } else {
        const dataEl = `<li>
        <img class="country-icon" src="${svg}" width='20' height='15'></img>
        <p class="country-list__text">${common}</p>
        </li>`;

        return countryList.insertAdjacentHTML("beforeend", dataEl)

    }
})
}

function onError() {
    Notiflix.Notify.failure('Oops, there is no country with that name')
}


