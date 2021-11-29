var currentUser, user_Name, user_location;

function insertUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get()
                .then(userDoc => {
                    user_Name = userDoc.data().name;
                    user_location = userDoc.data().location;
                    console.log(user_Name);
                    if (user_Name != null) {
                        document.getElementById("name-goes-here").value = user_Name;
                    }
                    if (user_location != null) {
                        document.getElementById("location").value = user_location;
                    }
                })
        } else {
            // No user is signed in.
        }
    });
}
insertUserInfo();



var count = 0;
function displayPlants() {
    const plantCards = document.getElementById("plant-cards");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).collection("plants").get()
                .then(allplants => {
                    allplants.forEach(doc => {
                        let nickname = doc.data().nickname;
                        let name = doc.data().common_name;
                        let imageName = name.replaceAll(" ", "_").toLowerCase();
                        let adoption = doc.data().adoption;
                        let card = document.createElement("div");
                        card.setAttribute("class", "card col-auto");
                        let photo = document.createElement("img");
                        photo.setAttribute("src", "./images/plants/" + imageName + ".png");
                        let cardCaption = document.createElement("div");
                        cardCaption.setAttribute("class", "card-body");
                        let cardTitle = document.createElement("h5");
                        cardTitle.setAttribute("class", "card-title");
                        cardTitle.innerHTML = "<strong>" + nickname + "</strong>";
                        let cardText = document.createElement("h7");
                        cardText.setAttribute("class", "card-text");
                        cardText.innerHTML = "<em>" + name + "</em>";
                        let cardAdoption = document.createElement("h7");
                        cardAdoption.setAttribute("class", "card-text1");
                        cardAdoption.innerHTML = adoption;
                        plantCards.appendChild(card);
                        card.appendChild(photo);
                        card.appendChild(cardCaption);
                        cardCaption.appendChild(cardTitle);
                        cardCaption.appendChild(cardText);
                        cardCaption.appendChild(cardAdoption);
                        count++;
                        console.log(count);
                        document.getElementById("numberOfPlants").innerHTML = count;
                    })
                })

        }
    })
}
displayPlants();

var namefield, locationfield, editbutton, cancelbutton, savebutton;

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfo').disabled = false;
    namefield = document.getElementById("name-goes-here");
    locationfield = document.getElementById("location");
    namefield.style.border = "1px solid black";
    locationfield.style.border = "1px solid black";
    savebutton = document.getElementById("savebutton");
    savebutton.style.visibility = "visible";
    editbutton = document.getElementById("editbutton");
    editbutton.style.visibility = "hidden";
    cancelbutton = document.getElementById("cancelbutton");
    cancelbutton.style.visibility = "visible";
}

function saveUserInfo() {
    userName = document.getElementById("name-goes-here").value;
    userLocation = document.getElementById("location").value;

    currentUser.update ({
        name: userName,
        location: userLocation
    })
    document.getElementById("personalInfo").disabled = true;
    namefield.style.border = "1px solid white";
    locationfield.style.border = "1px solid white"
    savebutton.style.visibility= "hidden";
    editbutton.style.visibility = "visible";
    cancelbutton.style.visibility = "hidden";
}
function cancelUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get()
                .then(userDoc => {
                    user_Name = userDoc.data().name;
                    user_location = userDoc.data().location;
                    console.log(user_Name);
                    if (user_Name != null) {
                        document.getElementById("name-goes-here").value = user_Name;
                    }
                    if (user_location != null) {
                        document.getElementById("location").value = user_location;
                    }
                })
        } else {
            // No user is signed in.
        }
    });
    document.getElementById("personalInfo").disabled = true;
    savebutton.style.visibility= "hidden";
    cancelbutton.style.visibility = "hidden";
    editbutton.style.visibility = "visible";
    namefield.style.border = "1px solid white";
    locationfield.style.border = "1px solid white"
}
var user1 = firebase.auth().currentUser;
function checkLogin() {
    user1 = firebase.auth().currentUser;
    if (user1) {
        window.location.href = "add.html";
    } else {
        alert("You should log in first");
        window.location.href = "profile.html"
    }
}