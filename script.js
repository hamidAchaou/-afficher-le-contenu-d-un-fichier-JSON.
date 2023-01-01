"use strict";
// ===================================================================
let filmData;
let tbody = document.getElementById("tbody");
const tableHeadings = document.querySelectorAll("thead th");

/*
==================== Sort Table ========================================
*/
var films = new XMLHttpRequest();
films.onload = function () {
  filmData = JSON.parse(films.responseText);
  console.log(filmData);
  createTable(filmData);
};

films.open("GET", "films.json");
films.send();
/*
==================== create Table ========================================
*/
function createTable(arr) {
  tbody.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let actors = "";
    for (let j = 0; j < arr[i].Acteurs.length; j++) {
      actors += `
              <li>${arr[i].Acteurs[j].name} ${arr[i].Acteurs[j].nationality}</li>
              `;
    }
    tbody.innerHTML += `
          <tr>
          <td><img src="${arr[i].image}" width="100" class="img-fluid"></td>
          <td>${arr[i].titre}</td>
          <td>${arr[i].réalisateur}</td>
          <td>${arr[i].durée}</td>
          <td>${arr[i].production}</td>
          <td>${arr[i].cinema}</td>
          <td>${actors}</td>
          </tr>
            `;
  }
}

/*
==================== create Table ========================================
*/
function sortTble() {
  tableHeadings.forEach((th) => {
    th.addEventListener("click", (e) => {
      const thIcon = th.querySelector("i");
      if (
        thIcon.classList.contains("notSorted") ||
        thIcon.classList.contains("sortedDescendally")
      ) {
        sortAscendant(th.id);
        console.log(tableHeadings);
        th.innerHTML = `${th.id} <i class="sortedAscendally fa-solid fa-sort-up"></i>`;
      } else if (thIcon.classList.contains("sortedAscendally")) {
        sortDescendant(th.id);
        tableHeadings.forEach((th) => (th.innerHtml = `${th.id}<i></i>`));

        th.innerHTML = `${th.id} <i class="sortedDescendally fa-solid fa-sort-down"></i>`;
      }
    });
  });
}
sortTble();

/*
==================== Sort Table ========================================
*/
// sort Descendant
function sortDescendant(idValue) {
  filmData.sort(function (a, b) {
    if (a[idValue].toLowerCase() < b[idValue].toLowerCase()) {
      return 1;
    } else if (a[idValue].toLowerCase() > b[idValue].toLowerCase()) {
      return -1;
    } else {
      return 0;
    }
  });
  createTable(filmData);
}
// sort Ascendant
function sortAscendant(idValue) {
  filmData.sort(function (a, b) {
    if (a[idValue].toLowerCase() > b[idValue].toLowerCase()) {
      return 1;
    } else if (a[idValue].toLowerCase() < b[idValue].toLowerCase()) {
      return -1;
    } else {
      return 0;
    }
  });
  createTable(filmData);
}

/*
=============== serch in Tabl =================
*/
function serchData(value) {
  let searchedMovies = [];
  for (let i = 0; i < filmData.length; i++) {
    if (filmData[i].titre.toLowerCase().includes(value.toLowerCase())) {
      if (filmData) searchedMovies.push(filmData[i]);
    }
    createTable(searchedMovies);
  }
}
