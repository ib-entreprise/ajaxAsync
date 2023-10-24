let filmsElement = document.querySelector('#films');
let planetsElement = document.querySelector('#planets');
let vehiclesElement = document.querySelector('#vehicles');
let vivantsElement = document.querySelector('#vivants');
 
onInit();

async function onInit(){
    const peoples = await getData('https://swapi.dev/api/people/');
    const planets = await getData('https://swapi.dev/api/planets/');
    const vehicles = await getData('https://swapi.dev/api/vehicles/');
    const films = await getData('https://swapi.dev/api/films');
    
    console.log(vehicles.count);
    console.log(films.count);
    displyDataOnPage(peoples.count, vivantsElement);
    displyDataOnPage(planets.count, planetsElement);    
    displyDataOnPage(vehicles.count, vehiclesElement);    
    displyDataOnPage(films.count, filmsElement);    
}

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function displyDataOnPage(data, item){
    item.textContent = data;
}
