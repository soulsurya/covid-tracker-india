const url =
  "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true";

let india = document.querySelector(".india .card");
let states = document.querySelector(".states");
states.innerHTML = "";
let refreshbtn = document.querySelector(".refresh img");

function load() {
  fetch(url, { method: "GET" })
    .then((Response) => Response.json())
    .catch((error) => document.write("<h1>Something went wrong :(</h1> " + error))
    .then((data) => {
      india.innerHTML = "";
      indiahtml = `<h2>india</h2>
      <div class="info-card">
      <ul>
    <li><span class="info">Active cases</span><span class="data">${data.activeCases}</span> </li>
    <li><span class="new-data">+${data.activeCasesNew}
       </span></li>
    <li><span class="info">recovered</span><span class="data">${data.recovered}</span></li>
    <li><span class="new-data">+${data.recoveredNew}
       </span></li>
    <li><span class="info">Total deaths</span><span class="data">${data.deaths} </span> </li>
    <li><span class="new-data">+${data.deathsNew}
       </span></li>
 </ul></div> `;
      india.innerHTML = indiahtml;
      countries = [...data.regionData];
      states.innerHTML = "";
      countries.forEach((regions) => {
        let statehtml = `
        <div class="card">
               <h2>${regions.region}</h2>
               <div class="info-card">
                  <ul>
                     <li><span class="info">Active cases</span><span class="data">${regions.totalInfected}</span> </li>
                     <li><span class="new-data">+${regions.newInfected}
                        </span></li>
                     <li><span class="info">recovered</span><span class="data">${regions.recovered}</span></li>
                     <li><span class="new-data">+${regions.newRecovered}
                        </span></li>
                     <li><span class="info">Total deaths</span><span class="data">${regions.deceased} </span> </li>
                     <li><span class="new-data">+${regions.newDeceased}
                        </span></li>
                  </ul>
               </div>
            </div>`;
        states.innerHTML += statehtml;
      });
    });
}

document.addEventListener("DOMContentLoaded", load);
refreshbtn.addEventListener("click", load);
