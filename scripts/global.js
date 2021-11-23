//Javascript file for global variables and scripts
const plantCards = document.getElementById("plant-cards");
const userDB = db.collection("users");
const plantDB = db.collection("plants");

//stores current user in local storage
var current_user = localStorage.getItem("current_user");

//checks if file exists
function checkFileExists(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}