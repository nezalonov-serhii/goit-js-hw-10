import Notiflix from 'notiflix';

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      return Notiflix.Notify.failure(
        'Oops, there is no country with that name'
      );
    }
    return response.json();
  });
}

export { fetchCountries };

// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');
