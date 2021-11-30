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