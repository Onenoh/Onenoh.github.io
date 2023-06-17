const cardsContainer = document.querySelector(".cards");
const filterContainer = document.getElementById("filterContainer");
const filters = document.getElementById("filters");

let filtersArray = [];

cardsContainer.addEventListener("click", (e) => {
    let element = e.target;
    if(element.classList.contains("filter")){
        let value = element.textContent;
        if(!filtersArray.includes(value)){
            filtersArray.push(value);
            displayFilter();
        }
    }
})

filterContainer.addEventListener("click", (e) => {
    let element = e.target;
    if(element.id === "clear"){
        clear();
    }

    if(element.classList.contains("filter--delete")){
        deleteElement(element);
    }
})

function createJob(item){
    return `
    ${createBorder(item)}
        <img class="card__profile" src="${item.logo}" alt="${item.company} company">
        <div class="card__information">
        <div class="card__field">
            <p class="card__company">${item.company}</p>
            ${createFlags(item)}
        </div>
        <h3 class="card__job">${item.position}</h3>
        <span>${item.postedAt}</span>
        <span class="card__spanSeparator">${item.contract}</span>
        <span>${item.location}</span>
        </div>
        <hr>
        <div class="card__filters">
            ${createFilters(item)}
        </div>
    </article>`
}

function loadJobs(){
    domStringRepresentation = '';
    fetchJson().then(data => {
        data.forEach((item) => { 
            domStringRepresentation += createJob(item);
        })

        cardsContainer.innerHTML = domStringRepresentation;
    });
}

async function fetchJson(){
    const res = await fetch("./data.json");
    const data = await res.json();

    return data;
}


function createFlags(data){
    let outputString = "";
    if(data.new) outputString += '<span class="flag flag--new">New!</span>';
    if(data.featured) outputString += '<span class="flag flag--featured">featured</span>';
    
    return outputString;
}

function createBorder(item){
    if(item.featured) return '<article class="card card--featured">';
    return '<article class="card">';
}

function createFilters(filters){
    let outputString = '';
    outputString += `<span class="filter">${filters.role}</span>`;
    outputString += `<span class="filter">${filters.level}</span>`;
    
    filters.languages.forEach(item => {
        outputString += `<span class="filter">${item}</span>`;
    })

    filters.tools.forEach(item => {
        outputString += `<span class="filter">${item}</span>`
    })

    return outputString;
}

function displayFilter(){
    if(filterContainer.classList.contains("inactive")) filterContainer.classList.remove("inactive");
    const div = document.createElement('DIV');
    div.classList.add("filter", "filter--x");
    div.innerHTML = `${filtersArray[filtersArray.length - 1]} <span class="filter--delete">X</span>`;
    filters.appendChild(div);
    filterJobs();
}

function clear(){
    filters.innerHTML = "";
    filtersArray = [];
    filterContainer.classList.add("inactive");
    loadJobs();
}

function filterJobs(){
    let outputString = '';
    if(filtersArray.length === 0) {
        filterContainer.classList.add("inactive");
        loadJobs();
        return;   
    }
    fetchJson().then(data => {
        data.forEach(item => {
            if(isValidItem(item)){
                outputString += createJob(item);
            }
        })

        cardsContainer.innerHTML = outputString;
    })
}

function isValidItem(item){
    let isValid = true;
    filtersArray.forEach(elem => {
        if(!item.languages.includes(elem) && !item.tools.includes(elem) && item.role !== elem && item.level !== elem){
            isValid = false;
        }
    })

    return isValid;
}

function deleteElement(element){
    let elementToDelete = element.parentElement;
    let filter = elementToDelete.textContent.split(" ")[0];

    filtersArray = filtersArray.filter(item => item !== filter);
    elementToDelete.remove();
    
    filterJobs();
}

loadJobs();