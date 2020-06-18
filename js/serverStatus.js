function initializeFirebase() {
    var firebaseConfig = {
        apiKey: "AIzaSyA2ESJBkNRjibHsQr2UTHtyYPslzNleyXw",
        authDomain: "cyberdojo-a2a3e.firebaseapp.com",
        databaseURL: "https://cyberdojo-a2a3e.firebaseio.com",
        projectId: "cyberdojo-a2a3e",
        storageBucket: "cyberdojo-a2a3e.appspot.com",
        messagingSenderId: "938057332518",
        appId: "1:938057332518:web:99c34da5abf1b1548533e7",
        measurementId: "G-0EWJ1V40VX"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

function getServerManagementInfo(){

    firebase.firestore().collection("Application Management").doc("ServerManagement").get().then((documentSnapshot) => {
        var data  = documentSnapshot.data();

        var serverStatus = data["serversAreUp"];

        if(serverStatus == true){

            var onlineHTML = `
            <span class = "badge badge-success" style="height: 30px; width: 100px; font-size: 20px;">Online</span>
            `;
            $('#serverStatus').html(onlineHTML);

        } else if(serverStatus == false){
            var offlineHTML = `
            <span class = "badge badge-danger" style="height: 30px; width: 100px; font-size: 20px;">Offline</span>
            `;
            $('#serverStatus').html(offlineHTML);
        } else {

        }

        var serverLastDowntime = data['lastDowntime'];

        if(serverLastDowntime == undefined || serverLastDowntime == null){
            $('#lastServerDownTime').html("Never");
        } else {
            $('#lastServerDownTime').html("10/20/2020 12:10 AM");
        }


    });
}

function changeServerStatus(){
    var checkedStatus = $('#cmn-toggle-4').is(':checked');

    console.log(checkedStatus);
}