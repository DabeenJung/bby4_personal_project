//Displays 10 user added plants.
function displayUserPlants() {
    let limit = 10;
    let count = 0;
    userDB.get().then(allUsers => {
        allUsers.forEach(doc => {
            userDB.doc(doc.id).collection("plants").where("nickname", ">", "").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let url = doc.ref.path;
                    getOwner(url).then((value) => { //value = user's name
                        let parse = value.split(',');
                        let id = parse[0];
                        let name = parse[1];
                        if (count < limit) {
                            let CardTemplate = document.getElementById("CardTemplate");
                            let newcard = CardTemplate.content.cloneNode(true);
                            let photo = doc.data().common_name.replaceAll(" ", "_").toLowerCase();
                            newcard.querySelector(".username").innerHTML = name;
                            newcard.querySelector(".username").setAttribute("href", "profile.html?user=" + id);
                            newcard.querySelector(".card-image-link").setAttribute("href", "profile.html?user=" + id);
                            // use dummy image if no user photo found
                            let fileLoc = "./images/user_photos/" + photo + ".jpg";
                            // let fileLoc = "./images/user_photos/" + doc.data().code + ".jpg";
                            if (checkFileExists(fileLoc)) {
                                newcard.querySelector(".card-image").src =
                                    "./images/user_photos/" + photo + ".jpg";
                                // "./images/user_photos/" + doc.data().code + ".jpg";
                            } else {
                                newcard.querySelector(".card-image").src =
                                    "./images/user_photos/dummy_image.jpg";
                            }
                            newcard.querySelector(".card-title").innerHTML = doc.data().nickname;
                            document.getElementById("plant-cards").appendChild(newcard);
                            count++;
                        }
                    })


                })
            })
        })
    })
}

//Returns name of the user who owns the plant.
//@param url of the current page
function getOwner(path) {
    return new Promise((res) => {
        let parse = path.split('/');
        let userID = parse[1];
        userDB.doc(userID).get().then((snapshot) => {
            return res(userID + "," + snapshot.data().name);
        })
    })
}

displayUserPlants();