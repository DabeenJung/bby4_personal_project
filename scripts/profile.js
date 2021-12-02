var currentUser, userName, user_location;


// Gets the user for the profile to retrieve.
async function getUserProfile() {
    let params = new URL(window.location.href);
    let stringParams = params.searchParams.toString();
    console.log(stringParams);
    if (stringParams.includes("user")) {
        return params.searchParams.get("user");
    } else {
        console.log("no user found");
        return null;
    }
}

// Gets the user's profile data. Uses the URL param if available, else uses the currently logged in user. Placeholder "404" profile to come.
getUserProfile().then(userID => {
    if (!userID) {
        loadCurrentUser();
    } else {
        displayPlants(userID);
        document.getElementById("editButton").style.visibility = "hidden";
        currentUser = db.collection("users").doc(userID);
        currentUser.get()
            .then(userDoc => {
                userName = userDoc.data().name;
                user_location = userDoc.data().location;
                console.log(userName);
                if (userName != null) {
                    document.getElementById("name-goes-here").value = userName;
                }
                if (user_location != null) {
                    document.getElementById("location").value = user_location;
                }
            })
    }
});

// Gets user's name and location from the firebase and displays them.
function loadCurrentUser() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            displayPlants(user.uid);
            document.getElementById("editButton").style.visibility = "visible";
            console.log("user id " + user.uid);
            currentUser.get()
                .then(userDoc => {
                    userName = userDoc.data().name;
                    user_location = userDoc.data().location;
                    console.log(userName);
                    if (userName != null) {
                        document.getElementById("name-goes-here").value = userName;
                    }
                    if (user_location != null) {
                        document.getElementById("location").value = user_location;
                    }
                })
        } else {
            // No user is signed in. Use placeholder profile or have message to say no user found.
        }
    });
}

// Gets the plant data under uid from the firebase and display them.
function displayPlants(userID) {
    let count = 0;
    db.collection("users").doc(userID).collection("plants").get()
        .then(allplants => {
            allplants.forEach(doc => {
                let nickname = doc.data().nickname;
                let name = doc.data().common_name;
                let imageName = name.replaceAll(" ", "_").toLowerCase();
                let adoption = doc.data().adoption;
                let card = document.createElement("div");
                card.setAttribute("class", "card col-auto");
                let photo = document.createElement("img");
                photo.setAttribute("src", "./images/user_photos/" + imageName + ".jpg");
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


var namefield, locationfield, editButton, cancelButton, saveButton;

// Allows the user to edit their profile information.
function editUserInfo() {
    //Enable the form fields
    document.getElementById('personal-info').disabled = false;
    namefield = document.getElementById("name-goes-here");
    locationfield = document.getElementById("location");
    namefield.style.border = "1px solid black";
    locationfield.style.border = "1px solid black";
    saveButton = document.getElementById("saveButton");
    saveButton.style.visibility = "visible";
    editButton = document.getElementById("editButton");
    editButton.style.visibility = "hidden";
    cancelButton = document.getElementById("cancelButton");
    cancelButton.style.visibility = "visible";
}

// Allows the user to save the information they edited.
function saveUserInfo() {
    userName = document.getElementById("name-goes-here").value;
    userLocation = document.getElementById("location").value;

    currentUser.update({
        name: userName,
        location: userLocation
    })
    document.getElementById("personal-info").disabled = true;
    namefield.style.border = "1px solid white";
    locationfield.style.border = "1px solid white"
    saveButton.style.visibility = "hidden";
    editButton.style.visibility = "visible";
    cancelButton.style.visibility = "hidden";
}

// Allows the user to cancel what they edited.
function cancelUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get()
                .then(userDoc => {
                    userName = userDoc.data().name;
                    user_location = userDoc.data().location;
                    console.log(userName);
                    if (userName != null) {
                        document.getElementById("name-goes-here").value = userName;
                    }
                    if (user_location != null) {
                        document.getElementById("location").value = user_location;
                    }
                })
        } else {
            // No user is signed in.
        }
    });
    document.getElementById("personal-info").disabled = true;
    saveButton.style.visibility = "hidden";
    cancelButton.style.visibility = "hidden";
    editButton.style.visibility = "visible";
    namefield.style.border = "1px solid white";
    locationfield.style.border = "1px solid white"
}