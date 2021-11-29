//Displays all user added plants that have an existing nickname field.
function displayUserPlants() {
    userDB.get().then(allUsers => {
        allUsers.forEach(doc => {
            userDB.doc(doc.id).collection("plants").where("nickname", ">", "").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let url = doc.ref.path;
                    getPlantOwner(url).then((value) => { //value = user's name
                        let CardTemplate = document.getElementById("CardTemplate");
                        let newcard = CardTemplate.content.cloneNode(true);
                        newcard.querySelector(".username").innerHTML = value;
                        // use dummy image if no user photo found
                        let fileLoc = "./images/user_photos/" + doc.data().code + ".jpg";
                        if (checkFileExists(fileLoc)) {
                            newcard.querySelector(".card-image").src =
                                "./images/user_photos/" + doc.data().code + ".jpg";
                        } else {
                            newcard.querySelector(".card-image").src =
                                "./images/user_photos/dummy_image.jpg";
                        }

                        newcard.querySelector(".card-title").innerHTML = doc.data().nickname;

                        document.getElementById("plant-cards").appendChild(newcard);
                    })
                })
            })
        })
    })
}

//Returns name of the user who owns the plant.
function getPlantOwner(path) {
    return new Promise((res) => {
        let parse = path.split('/');
        let userID = parse[1];
        userDB.doc(userID).get().then((snapshot) => {
            return res(snapshot.data().name);
        })
    })
}

displayUserPlants();