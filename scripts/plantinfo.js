const plantDB = db.collection("plants");
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

async function getPlantCode() {
  // create a URL object
  let params = new URL(window.location.href);
  code = params.searchParams.get("code");
  return code;
}

function getPlantData(plantCode) {
  var query = plantDB.where("code", "==", plantCode)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
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
        // console.log(doc.id, " => ", doc.data());
        console.log(doc.data().description);
        console.log(doc.data().humidity);
        loadPlantData();
      });
    });

}

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

//toggle fav and unfav button
//$(".fa").click(function () {
//  $(this).toggleClass("fa-heart fa-heart-o");
//  window.localStorage.setItem("fav" , b.className);
//  console.log("changed color");
//});

$(document).ready(function() {
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
        date = "<b>" + Day + "/" + Month + "/" + Year + "</b>"

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
      checklogin();
    }
  });
}

getPlantCode().then(getPlantData);