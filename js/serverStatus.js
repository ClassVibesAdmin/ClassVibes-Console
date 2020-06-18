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

function getServerManagementInfo() {

    firebase.firestore().collection("Application Management").doc("ServerManagement").get().then((documentSnapshot) => {
        var data = documentSnapshot.data();

        var serverStatus = data["serversAreUp"];

        if (serverStatus == true) {

            var onlineHTML = `
            <span class = "badge badge-success" style="height: 30px; width: 100px; font-size: 20px;">Online</span>
            `;
            $('#serverStatus').html(onlineHTML);

            document.getElementById("serverChangeToggle").checked = true;

        } else if (serverStatus == false) {

            document.getElementById("serverChangeToggle").checked = false;

            var offlineHTML = `
            <span class = "badge badge-danger" style="height: 30px; width: 100px; font-size: 20px;">Offline</span>
            `;
            $('#serverStatus').html(offlineHTML);
        } else {

        }

        var serverLastDowntime = data['lastDownTime'];

        if (serverLastDowntime == undefined || serverLastDowntime == null) {
            $('#lastServerDownTime').html("Never");
        } else {
            $('#lastServerDownTime').html(serverLastDowntime);
        }


    });
}

function changeServerStatus() {
    var checkedStatus = $('#serverChangeToggle').is(':checked');
    var serverManagerKey = document.getElementById('serverManagerKeyInput').value;

    if (serverManagerKey == 'tdoSeexYY/sM/VQ==994jmc903t48hs3e3dsf4rf') {
        $('#serverStatusChangeError').html('');

        if (checkedStatus == true) {

            firebase.firestore().collection("Application Management").doc("ServerManagement").update({
                "serversAreUp": true,
                
            });


        } else {

            var today = new Date();
            var todayFormatted = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

            firebase.firestore().collection("Application Management").doc("ServerManagement").update({
                "serversAreUp": false,
                "lastDownTime": todayFormatted,
            });
        }

        setTimeout(function () {
            location.reload();
        }, 1500);


    } else {
        var errorHTML = `
        <div class="alert alert-danger" role="alert">
  Server Manager Key is incorrect
</div>
        `;

        $('#serverStatusChangeError').html(errorHTML);
    }




    console.log(checkedStatus);
}