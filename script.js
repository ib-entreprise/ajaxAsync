let filmsElement = document.querySelector('#films');
let planetsElement = document.querySelector('#planets');
let vehiclesElement = document.querySelector('#vehicles');
let vivantsElement = document.querySelector('#vivants');
let totalPlanets = document.querySelector('#totalPlanets');
let planetsList = document.querySelector('#planetsList');
let Oneplanet = document.querySelectorAll('.Oneplanet');
let search = document.querySelector('#search');


let population = document.querySelector('#population');
let diametre = document.querySelector('#diametre');
let temperature = document.querySelector('#temperature');
let terrain = document.querySelector('#terrain');
let gravite = document.querySelector('#gravite');





onInit();
getAllPlanets();
async function onInit(){
    const peoples = await getData('https://swapi.dev/api/people/');
    const planets = await getData('https://swapi.dev/api/planets/');
    const vehicles = await getData('https://swapi.dev/api/vehicles/');
    const films = await getData('https://swapi.dev/api/films');
     
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
    
     for (let index = 0; index < results.length; index++) {
        const element = results[index];           
        addPlanetOnTable(element)
     }
 
    totalPlanets.textContent = planets.count + " resultats";  
}
function addPlanetOnTable(element){
    let tr = document.createElement('tr');
    let nom = document.createElement('td');
    let terain = document.createElement('td');
    
    tr.classList.add('Oneplanet');
    tr.id=element['url'];
    nom.textContent = element['name'];
    terain.textContent = element['terrain'];
    

    tr.appendChild(nom);
    tr.appendChild(terain);
    
    planetsList.appendChild(tr);
}

Oneplanet.forEach((e) => {
    e.addEventListener('click', () => {
        alert(e.querySelector('td').textContent);
    });
});


 planetsList.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.closest('.Oneplanet')) {
        let tr = target.closest('.Oneplanet').id;        
        let planet = await getData(tr);
        displyPlanetDetail(planet);
    }
});

 
function displyPlanetDetail(element){
    population.textContent = element['population'];
    diametre.textContent = element['diameter'];
    terrain.textContent = element['terrain'];
    temperature.textContent = element['climate'];
    gravite.textContent = element['gravity'];
}

search.addEventListener('keyup', function() {
    const searchTerm = this.value.toLowerCase();
    planetsList.childNodes.forEach((planet)=>{       
        if (planet.nodeType === Node.ELEMENT_NODE) {
            const planetName = planet.querySelector('td:first-child').textContent.toLowerCase();
            const planetTerrain = planet.querySelector('td:last-child').textContent.toLowerCase();
            
             if ( planetName.includes(searchTerm) ||  planetTerrain.includes(searchTerm)) {
                planet.style.display = 'flex';   
                // planet.style.classList.add('right') ;
            }else{
                planet.style.display = 'none';                              
             }
        }                
    });     
});

search.addEventListener('keyup', dispalyAllPlanetList);

