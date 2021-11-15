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
                    })
                })

        }
    })
}
displayPlants();