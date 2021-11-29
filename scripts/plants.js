// Gets all available plants in the firebase database and adds their respective card to the page.
function displayAllPlants() {
  plantDB.get().then(allPlants => {
    allPlants.forEach(doc => {
      addCards(doc);
    })
  })
}

// Creates the HTML elements required for each plant card.
function addCards(doc) {
  let common_name = doc.data().common_name;
  let species = doc.data().species;
  let code = doc.data().code.toLowerCase();
  let card = document.createElement("div");
  card.setAttribute("class", "card col-auto");
  let cardCaption = document.createElement("div");
  let photo = document.createElement("img");
  photo.setAttribute("src", "../images/plants/" + code + ".png");
  cardCaption.setAttribute("class", "card-body");
  let links = document.createElement("a");
  links.setAttribute("href", "plantinfo.html?code=" + doc.data().code);
  links.setAttribute("id", common_name);
  links.setAttribute("class", "linkstoinfo");
  let cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerHTML = "<strong>" + common_name + "</strong>";
  let cardText = document.createElement("h7");
  cardText.setAttribute("class", "card-text");
  cardText.innerHTML = "<em>" + species + "</em>";
  plantCards.appendChild(card);
  card.appendChild(photo);
  card.appendChild(cardCaption);
  cardCaption.appendChild(links);
  links.appendChild(cardTitle);
  cardCaption.appendChild(cardText);
}

// Adds an event listener to the search button to call the searchPlant function.
document.getElementById("searchButton").addEventListener("click", function () {
  searchPlant();
});

// Adds an event listener to the clear option in the search field and reloads the page with all plants when called. 
document.getElementById("searchField").addEventListener("search", function (event) {
  clearCards();
  displayAllPlants();
});

// Gets the plants associated with the search query and adds their plant cards to the page.
function searchPlant() {
  let plantQuery = document.getElementById("searchField");
  db.collection("plants").where("common_name", "==", plantQuery.value.toLowerCase()).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      displaySearchResults(doc);
      //console.log(doc.data());
    });
  });
}

// Prepares and adds the plant cards based on the query results.
function displaySearchResults(doc) {
  clearCards();
  addCards(doc);
}

// Removes the current set of plant cards on the page.
function clearCards() {
  while (plantCards.firstChild) {
    plantCards.removeChild(plantCards.firstChild);
  }
}

displayAllPlants();