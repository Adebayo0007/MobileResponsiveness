const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
console.table(endpoint);
const cities = [];
fetch(endpoint)
.then(promise => promise.json())
.then(data => cities.push(...data));
function findMatches(waordToMatch, cities){
    return cities.filter(place =>{
        const regex = new RegExp(waordToMatch, 'gi');
        return place.city.match(regex || place.state.match(regex))
    });
}


// var headers = new Headers();
// headers.append("X-CSCAPI-KEY", "API_KEY");

// var requestOptions = {
// method: 'GET',
// headers: headers,
// redirect: 'follow'
// };

// fetch("https://api.countrystatecity.in/v1/states", requestOptions)
// .then(response => response.text())
// .then(result => console.log(result))
// .catch(error => console.log('error', error));



function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
}

function displayMatches(){
    const matchArray = findMatches(this.value, cities);
    console.log(matchArray);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex,`<span>${this.value}</span>`);
        const stateName = place.state.replace(regex,`<option>${this.value}</span>`);


        return ` 
        <li>
         <span>${numberWithCommas(cityName)} ${numberWithCommas(stateName)}</span>
         <span>${numberWithCommas(place.population)}</span>
         </li> `;

    }).join('');
    suggestions.innerHTML = html;
}
const searchInput = document.querySelector("input");
const suggestions = document.querySelector("ul");
const datas = document.querySelectorAll("li");

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

let take = function(){
    datas.forEach(x =>x.addEventListener("keydown", function(){searchInput.textContent = x.textContent;})
       
        )

    }
    take();

