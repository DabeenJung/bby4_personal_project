const plantCards = document.getElementById("plant-cards");
const plantDB = db.collection("plants");

function displayAllPlants() {
    plantDB.get().then(allPlants => {
        allPlants.forEach(doc => {
          addCards(doc);
        })
    })
}

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
      // should pass an id of the element
      //links.setAttribute("onclick", "Test(this.id)");
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


document.getElementById("searchButton").addEventListener("click", function() {
  searchPlant();
});

// Upon clearing the search field, all plant cards are displayed again
document.getElementById("searchField").addEventListener("search", function(event) {
  clearCards();
  displayAllPlants();
});

function searchPlant(){
  console.log("clicky");
  let plantQuery = document.getElementById("searchField");
  db.collection("plants").where("common_name", "==", plantQuery.value.toLowerCase()).get().then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
         displaySearchResults(doc);
         //console.log(doc.data());
    });
  });
}

function displaySearchResults(doc){
  clearCards();
  addCards(doc);
}

function clearCards(){
  while(plantCards.firstChild) {
    plantCards.removeChild(plantCards.firstChild);
  }
}

function Test(id) {
    localStorage.setItem('common_name', id);
}
function test2() {
    exa = this.id;
    localStorage.setItem("common_name", exa);
}

displayAllPlants();

var user1 = firebase.auth().currentUser;
function checklogin() {
    user1 = firebase.auth().currentUser;
    if (user1) {
        window.location.href = "add.html";
    } else {
        alert("You should log in first");
        window.location.href = "plants.html"
    }
}
