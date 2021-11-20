var currentUser = db.collection("users").doc(user.uid);
var user1 = firebase.auth().currentUser;
function checklogin() {
    user1 = firebase.auth().currentUser;
    if (user1) {
        window.location.href = "add.html";
    } else {
        alert("You should log in first");
        window.location.href = "main.html";
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
            location.href = "main.html";
        }
    }
}