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
let select = document.querySelector('#select');
let selectPopulation = document.querySelector('#selectPopulation');

let defaultOption = document.querySelector('#defaultOption');
let toHide = document.querySelector('#toHide');
let toShow = document.querySelector('#toShow');

 

onInit();
getAllPlanets();
let allPlanetsResult = [];
let allPlanets = [];

console.log(allPlanets);



setDefaultOptionValueTofiter();
toShow.style.display = 'none';


async function setDefaultOptionValueTofiter(){
   let planets = await getData('https://swapi.dev/api/planets/');
   defaultOption.value = planets.count;    
}

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

async function getAllPlanets() {
    let nextUrl = 'https://swapi.dev/api/planets/';
    do {
        const planets = await getData(nextUrl);
        allPlanets = allPlanets.concat(planets.results);
        nextUrl = planets.next;
    } while (nextUrl);

    allPlanetsResult = allPlanets.results;
    allPlanets.forEach((element) => {
        addPlanetOnTable(element);
    });
    totalPlanets.textContent = allPlanets.length + " résultats";
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
    toHide.style.display='none';
    toShow.style.display = 'block';

    const target = event.target;
    
    if (target.closest('.Oneplanet')) {
        let tr = target.closest('.Oneplanet').id;       
        let line =  target.closest('.Oneplanet');
       
        target.closest('.Oneplanet').style.background = "green" ;
        target.closest('.Oneplanet').style.color = "white" ;
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
                planet.style.display = 'table-row';                   
            }else{
                planet.style.display = 'none';                              
             }
        }                
    });    
});

select.addEventListener('change', async (e)=>{    
        dispalyNemberSeleeeanetList(e);    
});

selectPopulation.addEventListener('change', async (e)=>{    
    displayPlanetByPopulation(e);    
});

async function dispalyNemberSeleeeanetList(event){    
    let selectValue = (event.target.value);    
    planetsList.childNodes.forEach((planet,index)=>{       
        if (planet.nodeType === Node.ELEMENT_NODE) {
            const line = planet.querySelectorAll('tr');
            if(index > selectValue){
            planet.style.display='none';
            }else{              
                planet.style.display='table-row';            
            }
        }
    });    
    totalPlanets.textContent = selectValue + " resultats  ";  
}
async function displayPlanetByPopulation(event) {
    let selectValue = event.target.value;

    // Utilisez la variable globale allPlanets ici
    allPlanets.forEach((planet,index) => {
        let length = planet['residents'].length;
        if( length > 0 && length <= selectValue ){
            console.log(planet);
        }        
    });

    // Vous pouvez maintenant mettre en œuvre votre logique de tri par population
}

 