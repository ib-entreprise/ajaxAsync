
let missions = document.querySelector('#missions');
let planets = document.querySelector('#planets');
let vehicules = document.querySelector('#vehicules');
let vivants = document.querySelector('#vivants');


onInit();

async function onInit(){
    const peoples = await getData('https://swapi.dev/api/people/');
    const planets = await getData('https://swapi.dev/api/planets/');
    console.log(planets.count);
    displyDataOnPage(peoples.count,vivants);
    displyDataOnPage(planets.count,planets);
}


async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


function displyDataOnPage(data,item){
    item.textContent= data;
}