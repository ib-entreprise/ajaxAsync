let filmsElement = document.querySelector('#films');
let planetsElement = document.querySelector('#planets');
let vehiclesElement = document.querySelector('#vehicles');
let vivantsElement = document.querySelector('#vivants');
let totalPlanets = document.querySelector('#totalPlanets');
let planetsList = document.querySelector('#planetsList');
let Oneplanet = document.querySelector('.Oneplanet');

onInit();
getAllPlanets();
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

async function getAllPlanets(){
    const planets = await getData('https://swapi.dev/api/planets/');  
    const results = planets.results;
    console.log(results);
     for (let index = 0; index < results.length; index++) {
        const element = results[index];   
        console.log(element['name']);     
        let tr = document.createElement('tr');
        let nom = document.createElement('td');
        let terain = document.createElement('td');
        let url = document.createElement('td');

        tr.classList.add('Oneplanet');
        nom.textContent = element['name'];
        terain.textContent = element['terrain'];
        url.textContent = element['url'];

        tr.appendChild(nom);
        tr.appendChild(terain);
        tr.appendChild(url);
        planetsList.appendChild(tr);
     }
    totalPlanets.textContent = planets.count;  
}

Oneplanet.addEventListener('click', getOnePlanet);
 
 