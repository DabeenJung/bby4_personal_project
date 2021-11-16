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
function displayBookmark() {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).collection("bookmark").get().then(allPlants => {
                allPlants.forEach(doc => {
                    let species = doc.data().name;
                    let dateAdded = doc.data().dateAdded; 

                    let card = document.createElement("div");
                    card.setAttribute("class", "box img-fluid rounded-start");
                    
                    let photo = document.createElement("img");
                    photo.setAttribute("src", "./images/plants/" + species + ".png");

                    let cardCaption = document.createElement("div");
                    cardCaption.setAttribute("class", "card-body");

                    let cardTitle = document.createElement("h5");
                    cardTitle.setAttribute("class", "card-title");
                    cardTitle.innerHTML = "<strong>" + species + "</strong> <br>";

                    let cardText = document.createElement("h7");
                    cardText.setAttribute("class", "card-text");
                    cardText.innerHTML = "<em>" + dateAdded + "</em>";

                    let cardText1 = document.createElement("div");
                    cardText1.setAttribute("class", "material-icons");
                    cardText1.innerHTML = ("id", "favorite");

                    plantCards.appendChild(card);
                    card.appendChild(photo);
                    card.appendChild(cardCaption);
                    cardCaption.appendChild(cardTitle);
                    cardCaption.appendChild(cardText);
                    card.appendChild(cardText1);
                })
            })
        }
    })
}
displayBookmark();

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