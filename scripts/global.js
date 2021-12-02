// Javascript file for global variables and scripts
const plantCards = document.getElementById("plant-cards");
const userDB = db.collection("users");
const plantDB = db.collection("plants");

// Stores current user in local storage
var theCurrentUser = localStorage.getItem("current_user");

// Checks if file exists
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

// Initialize the FirebaseUI Widget using Firebase.
function checkLoginResult() {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                let currUser = firebase.auth().currentUser.email;
                localStorage.setItem('current_user', currUser);
                console.log("added user to local" + currUser);
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                var user = authResult.user;

                if (authResult.additionalUserInfo.isNewUser) {
                    db.collection("users").doc(user.uid).set({
                            name: user.displayName,
                            email: user.email,
                            location: ""
                        }).then(function () {
                            console.log("New user aded to firestore");
                            window.location.assign("main.html");
                        })
                        .catch(function (error) {
                            console.log("Error adding new user: " + error);
                        });
                } else {
                    return true;
                }

                return false;
            },
            uiShown: function () {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'main.html',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>',
        // Privacy policy url.
        privacyPolicyUrl: '<your-privacy-policy-url>'
    };


    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
}

// Prevents user from accessing the add plant page if they are not logged in 
function checkLoginAdd() {
    user = firebase.auth().currentUser;
    if (user) {
        window.location.href = "add.html";
    } else {
        var txt = confirm("You need to be logged in before you can add plants to your profile. Go to login page?");
        if (txt == true) {
            location.href = "login.html";
        }
    }
}

// Prevents user from accessing the bookmarks page if they are not logged in 
function checkLoginBookmark() {
    user = firebase.auth().currentUser;
    if (user) {
        window.location.href = "bookmark.html";
    } else {
        var txt = confirm("You need to be logged in before you can favourite plants. Go to login page?");
        if (txt == true) {
            location.href = "login.html";
        }
    }
}

// Prevents user from accessing their user profile if they are not logged in 
function promptToLogin() {
    user = firebase.auth().currentUser;
    if (user) {
        window.location.href = "profile.html";
    } else {
        var txt = confirm("Do you want to go to login page?");
        if (txt == true) {
            location.href = "login.html";
        }
    }
}