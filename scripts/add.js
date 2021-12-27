var currentUser;

// Saves the plant data that the user added to the firebase.
function savePlantInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid).collection("plants");

            plantName = document.getElementById("nameInput").value;
            plantNickname = document.getElementById("nicknameInput").value;
            plantAdoption = document.getElementById("adoptionInput").value;
            adoptedon = "Adopted on "

            currentUser.add({
                common_name: plantName,
                nickname: plantNickname,
                adoption: adoptedon + plantAdoption
            })
            alert("New plant is added!");
        }
    });
}

function getPlantTypes(doc) {
    let selectType = document.getElementById("nameInput");
    let type = doc.data().common_name;
    let cardOption = document.createElement("option");
    cardOption.setAttribute("value", type);
    cardOption.innerHTML = type;
    selectType.appendChild(cardOption);
}

function displayAllTypes() {
    plantDB.get().then(allPlants => {
        allPlants.forEach(doc => {
            getPlantTypes(doc);
        })
    })
}

displayAllTypes();