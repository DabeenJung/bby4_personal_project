function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get()
                .then(userDoc => {
                    var user_Name = userDoc.data().name;
                    console.log(user_Name);
                    document.getElementById("name-goes-here").innerText = user_Name;
                })
        } else {
            // No user is signed in.
        }
    });
}
insertName();

const plantCards = document.getElementById("plant-cards");
var species;
function displayBookmark() {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).collection("bookmark").get().then(allPlants => {
                allPlants.forEach(doc => {
                    species = doc.data().name.replaceAll(" ", "_").toLowerCase();;
                    let dateAdded = doc.data().dateAdded; 
                    let code = doc.data().name.replaceAll(" ", "_").toUpperCase();

                    let card = document.createElement("div");
                    card.setAttribute("class", "box img-fluid rounded-start");
                    
                    let photo = document.createElement("img");
                    photo.setAttribute("src", "./images/plants/" + species + ".png");

                    let cardCaption = document.createElement("div");
                    cardCaption.setAttribute("class", "card-body");
                    let links = document.createElement("a");
                    links.setAttribute("href", "plantinfo.html?code=" + code);
                    links.setAttribute("id", species);
                    links.setAttribute("class", "linkstoinfo");

                    let cardTitle = document.createElement("h5");
                    cardTitle.setAttribute("class", "card-title");
                    cardTitle.innerHTML = "<strong>" + species + "</strong> <br>";

                    let cardText = document.createElement("h7");
                    cardText.setAttribute("class", "card-text");
                    cardText.innerHTML = dateAdded;

                    let cardText1 = document.createElement("i");
                    cardText1.setAttribute("class", "fa fa-heart");
                    cardText1.setAttribute("type", "button");
                    cardText1.setAttribute("onclick", "removeFav()");
                    cardText1.setAttribute("id", "favorite");

                    plantCards.appendChild(card);
                    card.appendChild(photo);
                    card.appendChild(cardCaption);
                    cardCaption.appendChild(cardTitle);
                    cardCaption.appendChild(links);
                    links.appendChild(cardTitle);
                    cardCaption.appendChild(cardText);
                    card.appendChild(cardText1);
                })
            })
        }
    })
}
displayBookmark();

function removeFav() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).collection("bookmark").doc(species).delete().then(() => {
                console.log("Document successfully deleted!");
                console.log(species);
              }).catch((error) => {
                  console.error("Error removing document: ", error);
              });
        }
    })
}

/*
    function displayBookmark() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                db.collection("users").doc(user.uid).collection("bookmark").get()
                    .then(allbookmark => {
                        allbookmark.forEach(doc => {
                            var plantName = doc.data().name;
                            var plantId = doc.data().code;
                            document.getElementById(plantId).innerText = plantName;
                        })
                    })
            }
        })
    }
    displayBookmark();


    function displayBookmarkDate() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                db.collection("users").doc(user.uid).collection("bookmark").get()
                    .then(allbookmark => {
                        allbookmark.forEach(doc => {
                            var dateAdded = doc.data().dateAdded;
                            var dateAddedID = doc.data().dateAddedID;
                            document.getElementById(dateAddedID).innerText = dateAdded;
                        })
                    })
            }
        })
    }
    displayBookmarkDate();
*/

var user1 = firebase.auth().currentUser;
function checklogin() {
    user1 = firebase.auth().currentUser;
    if (user1) {
        window.location.href = "add.html";
    } else {
        alert("You should log in first");
        window.location.href = "bookmark.html"
    }
}

function prompttologin() {
    user1 = firebase.auth().currentUser;
    if (user1) {
        window.location.href = "profile.html";
    } else {
        var txt = confirm("Do you want to go to login page?");
        if (txt == true) {
            location.href = "login.html";
        } else {
            location.href = "bookmark.html";
        }
    }
}