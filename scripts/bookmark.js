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