export const fetchCountries = name => {
   return fetch(
      `https://restcountries.com/v3.1/name/${name}?sort=name&fields=name,name.official,capital,population,flags,languages`,
   ).then(response => response.json());
};