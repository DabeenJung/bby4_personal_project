
    const plantDB = db.collection("plants");
    var species;
    var description;
    var light;
    var water;
    var fertilizer;
    var humidity;
    var temperature;
    var commonName;

    function getPlantData() {
      var query = plantDB.where("common_name", "==", "Lavender")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            species = doc.data().species;
            description = doc.data().description;
            light = doc.data().sunlight;
            water = doc.data().watering;
            fertilizer = doc.data().fertilize;
            humidity = doc.data().humidity;
            temperature = doc.data().temperature;
            commonName = doc.data().common_name;
            // console.log(doc.id, " => ", doc.data());
             console.log(doc.data().description);
             console.log(doc.data().humidity);
             loadPlantData();
          });
        });

    }

    getPlantData();

    function loadPlantData(){
         document.getElementById("description").innerHTML = description;
         document.getElementById("water-info").innerHTML = water;
         document.getElementById("light-info").innerHTML = light;
         document.getElementById("fertilizer-info").innerHTML = fertilizer;
         document.getElementById("temperature-info").innerHTML = temperature;
         document.getElementById("humidity-info").innerHTML = humidity;
    }
    
    //toggle fav and unfav button
    $(".fa").click(function(){
      $(this).toggleClass("fa-heart fa-heart-o");
      console.log("changed color");
    });

    var userBookmark
    var code
    function addToFav() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var iconID = document.getElementById("fav");
                console.log(iconID);
                if(iconID.className.match("fa fa-heart-o")) {
                  userBookmark = db.collection("users").doc(user.uid).collection("bookmark");

                  code = Math.floor(1000 + Math.random() * 9000);
                  console.log(code);
                  let currentDate = new Date();
                  let Day = currentDate.getDate();
                  let Month = currentDate.getMonth() + 1;
                  let Year = currentDate.getFullYear();
                  console.log(Day);
                  console.log(Month);
                  console.log(Year);
                  date = "<b>" + Day + "/" + Month + "/" + Year + "</b>"

                  userBookmark.add({
                      name: commonName,
                      dateAdded: date,
                      plantCode: code
                  })
                  alert("Plant added to bookmark!");
              }
              else{
                db.collection("users").doc(user.uid).collection("bookmark").doc(bookmark.getID()).delete().then(() => {
                  console.log("bookmark deleted");
                });
              };
              
            }
        });
    }
  
