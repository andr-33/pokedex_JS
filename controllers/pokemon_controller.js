
const container = document.getElementById("card-container");
var nextUrl;
var prevUrl;

const getPokemons = async() =>{
    const res = await fetch('https://pokeapi.co/api/v2/pokemon');
    const dataUsefull = await res.json();
    const pokemons = dataUsefull.results;
    nextUrl = dataUsefull.next;
    prevUrl = dataUsefull.previous;
    createCards(pokemons);
};

const getNextPokemons = async()=>{
    const res = await fetch(nextUrl);
    const dataUsefull = await res.json();
    const pokemons = dataUsefull.results;
    nextUrl = dataUsefull.next;
    prevUrl = dataUsefull.previous;
    container.innerHTML = "";
    createCards(pokemons);
};

const getPrevPokemons = async()=>{
    const res = await fetch(prevUrl);
    const dataUsefull = await res.json();
    const pokemons = dataUsefull.results;
    nextUrl = dataUsefull.next;
    prevUrl = dataUsefull.previous;
    container.innerHTML = "";
    createCards(pokemons);
};



function createCards(pokemons){
    pokemons.map( async(pokemon, index)=>{
        const moreInfo = await fetch(pokemon.url);
        let pokeAllInfo = await moreInfo.json();
        const stats = pokeAllInfo.stats;

        container.innerHTML += 
        `<div class="column poke-card">
            <div id="ci-${index}" class="poke-card-img poke-section-style" onclick="showStats(${index})">
                <img class="poke-img" src="${pokeAllInfo.sprites.other.dream_world.front_default}" />
            </div>
            <div id="cs-${index}" class="poke-section-style poke-card-stats" onclick="showStats(${index})">
                <p>Hp: <span>${stats[0].base_stat} pts</span> </p>
                <p>Attack: <span>${stats[1].base_stat} pts</span></p>
                <p>Defense: <span>${stats[2].base_stat} pts</span></p>
                <p>Special Attack: <span>${stats[3].base_stat} pts</span></p>
                <p>Speed: <span>${stats[5].base_stat} pts</span></p>
                <p>Height: <span>${toCorrectHeight(pokeAllInfo.height)} m</span></p>
                <p>Weight: <span>${toCorrectWeight(pokeAllInfo.weight)} Kg</span></p>
            </div>
            <div class="poke-card-info poke-section-style">
                <p class="poke-txt">Name: 
                    <span>${pokemon.name} </span>
                </p>
                <p class="poke-txt">Type: 
                    ${getPokemonTypes(pokeAllInfo.types)}
                </p>
            </div>
        </div>`;
    });
}

function showStats(index){
    const cardImg = document.getElementById(`ci-${index}`);
    const cardStats = document.getElementById(`cs-${index}`);

    const cardStatsHidden = cardStats.classList.contains('card-unhide');

    if(!cardStatsHidden){
        cardStats.classList.add('card-unhide');
        cardImg.classList.add('card-hide');
    }
    else{
        cardStats.classList.remove('card-unhide');
        cardImg.classList.remove('card-hide');
    }
};

function toCorrectHeight(height){
    let trueHeight = height / 10;
    return trueHeight;
}

function toCorrectWeight(weight){
    let trueWeight = weight / 10;
    return trueWeight;
}

const getPokemonTypes = (types)=>{
    let typesInCard = "";
    types.map((slot)=>{
        switch(slot.type.name){
            case "normal": typesInCard += `<span class="poke-type type-normal">${slot.type.name}</span>`; break;
            case "fighting": typesInCard += `<span class="poke-type type-fighting">${slot.type.name}</span>`; break;
            case "flying": typesInCard += `<span class="poke-type type-flying">${slot.type.name}</span>`; break;
            case "poison": typesInCard += `<span class="poke-type type-poison">${slot.type.name}</span>`; break;
            case "rock": typesInCard += `<span class="poke-type type-rock">${slot.type.name}</span>`; break;
            case "ground": typesInCard += `<span class="poke-type type-ground">${slot.type.name}</span>`; break;
            case "bug": typesInCard += `<span class="poke-type type-bug">${slot.type.name}</span>`; break;
            case "ghost": typesInCard += `<span class="poke-type type-ghost">${slot.type.name}</span>`; break;
            case "steel": typesInCard += `<span class="poke-type type-steel">${slot.type.name}</span>`; break;
            case "fire": typesInCard += `<span class="poke-type type-fire">${slot.type.name}</span>`; break;
            case "water": typesInCard += `<span class="poke-type type-water">${slot.type.name}</span>`; break;
            case "grass": typesInCard += `<span class="poke-type type-grass">${slot.type.name}</span>`; break;
            case "electric": typesInCard += `<span class="poke-type type-electric">${slot.type.name}</span>`; break;
            case "psychic": typesInCard += `<span class="poke-type type-psychic">${slot.type.name}</span>`; break;
            case "ice": typesInCard += `<span class="poke-type type-ice">${slot.type.name}</span>`; break;
            case "dragon": typesInCard += `<span class="poke-type type-dragon">${slot.type.name}</span>`; break;
            case "dark": typesInCard += `<span class="poke-type type-dark">${slot.type.name}</span>`; break;
            case "fairy": typesInCard += `<span class="poke-type type-fairy">${slot.type.name}</span>`; break;
            case "unknown": typesInCard += `<span class="poke-type type-unknown">${slot.type.name}</span>`; break;
            case "shadow": typesInCard += `<span class="poke-type type-shadow">${slot.type.name}</span>`; break;
        }
    });

    return typesInCard;
};

getPokemons();