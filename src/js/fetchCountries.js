

function fetchCountries(value) {
   
    fetch(`https://restcountries.com/v3.1/name/${value}?fields=name,capital,flags,population,languages`)
    .then(response => {
        if(!response.status === "ok") throw new Error("Incorrect requets");
        return response.json()
    })
}

export { fetchCountries };