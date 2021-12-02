// Initialize variables for plant care information.
var code;
var species;
var description;
var light;
var water;
var fertilizer;
var humidity;
var temperature;
var commonName;
var photo;
var imageName;

// Gets the name of the plant to query from the URL parameter.
async function getPlantCode() {
  let params = new URL(window.location.href);
  code = params.searchParams.get("code");
  return code;
}

// Gets the plant care information from the database.
function getPlantData(plantCode) {
  var query = plantDB.where("code", "==", plantCode)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        imageName = code.toLowerCase();
        photo = document.createElement("img");
        photo.setAttribute("src", "./images/plants/" + imageName + ".png");
        photo.setAttribute("id", "picture");
        species = doc.data().species;
        description = doc.data().description;
        light = doc.data().sunlight;
        water = doc.data().watering;
        fertilizer = doc.data().fertilize;
        humidity = doc.data().humidity;
        temperature = doc.data().temperature;
        commonName = doc.data().common_name;
        console.log(doc.data().description);
        console.log(doc.data().humidity);
        loadPlantData();
      });
    });

}

// Loads the plant care information in the existing HTML elements.
function loadPlantData() {
  document.getElementById("plant-image").appendChild(photo);
  document.getElementById("plant-name").innerHTML = commonName;
  document.getElementById("plant-specie").innerHTML = species;
  document.getElementById("description").innerHTML = commonName + description;
  document.getElementById("water-info").innerHTML = water;
  document.getElementById("light-info").innerHTML = light;
  document.getElementById("fertilizer-info").innerHTML = fertilizer;
  document.getElementById("temperature-info").innerHTML = temperature;
  document.getElementById("humidity-info").innerHTML = humidity;
}


$(document).ready(function () {
  var state = document.getElementById("fav");
  console.log(state.className);
  if (window.localStorage.getItem("fav") != null) {
    var pb = window.localStorage.getItem("className");
    console.log(pb);
    if (pb == "fa fa-heart") {
      state.className = "fa fa-heart";
    } else {
      state.className = "fa fa-heart-o";
    }
  }
});

var userBookmark
var code
var save
var iconID

// Allows user to add plant to bookmark page by clicking the heart icon in the plant info page
function addToFav() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      iconID = document.getElementById("fav");
      console.log(iconID);

      if (iconID.className.match("fa fa-heart-o")) {
        userBookmark = db.collection("users").doc(user.uid).collection("bookmark");

        code = Math.floor(1000 + Math.random() * 9000);
        console.log(code);
        let currentDate = new Date();
        let Day = currentDate.getDate();
        let Month = currentDate.getMonth() + 1;
        let Year = currentDate.getFullYear();
        console.log(Day);
        console.log(Month);
        console.log(Year);
        date = Year + "-" + Month + "-" + Day

        userBookmark.doc(commonName).set({
          name: commonName,
          dateAdded: date,
          plantCode: code
        })
        iconID.className = "fa fa-heart";
        localStorage.setItem("className", "fa fa-heart");
        localStorage.getItem("className");
        alert("Plant added to bookmark!");
      } else {
        db.collection("users").doc(user.uid).collection("bookmark").doc(commonName).delete().then(() => {
          console.log("Document successfully deleted!");
          iconID.className = "fa fa-heart-o"
          localStorage.setItem("className", "fa fa-heart-o");
          localStorage.getItem("className");
          alert("Plant removed from bookmark");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
      };
    } else {
      checkLoginAdd();
    }
  });
}

getPlantCode().then(getPlantData);