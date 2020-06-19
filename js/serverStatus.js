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

            var serverLastUptime = data['serverWentUp'];

            var serverLastDowntime = data['lastDownTime'];
            //Get Server Uptime 

            var startDate = new Date(serverLastDowntime);
            // Do your operations
            var endDate = new Date();
            var seconds = (endDate.getTime() - startDate.getTime()) / 1000;

            given_seconds = seconds;

            dateObj = new Date(given_seconds * 1000);
            hours = dateObj.getUTCHours();
            minutes = dateObj.getUTCMinutes();
            seconds = dateObj.getSeconds();

            timeString = hours.toString().padStart(2, '0')
                + ':' + minutes.toString().padStart(2, '0')
                + ':' + seconds.toString().padStart(2, '0');

            console.log(timeString);

            $('#serverUptime').html(timeString);

        } else if (serverStatus == false) {

            document.getElementById("serverChangeToggle").checked = false;

            var offlineHTML = `
            <span class = "badge badge-danger" style="height: 30px; width: 100px; font-size: 20px;">Offline</span>
            `;
            $('#serverStatus').html(offlineHTML);

            $('#serverUptime').html("Server Down");
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

            var today = new Date();
            var todayFormatted = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            firebase.firestore().collection("Application Management").doc("ServerManagement").update({
                "serversAreUp": true,
                "serverWentUp": todayFormatted,

            });


        } else {

            var today = new Date();
            var todayFormatted = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

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

function sendServerAlert() {
    var title = document.getElementById('alertTitle').value;
    var message = document.getElementById('alertDescription').value;
    var alertHours = document.getElementById('alertHours').value;
    var alertMinutes = document.getElementById('alertMinutes').value;
    var alertSeconds = document.getElementById('alertSeconds').value;
    var serverManagerKey = document.getElementById('serverManagerKeyAlertInput').value;


    if (title, message, alertHours, alertMinutes, alertSeconds, serverManagerKey == '') {
        var alertHTML = `
        <div class="alert alert-danger" role="alert">
        You cannot leave any fields blank
      </div>
        `;
        $('#alertSendError').html(alertHTML);
    } else {

        if (serverManagerKey == 'tdoSeexYY/sM/VQ==994jmc903t48hs3e3dsf4rf') {

            $('#alertSendError').html("");

            firebase.firestore().collection('ApplicationManagement').doc("ServerAlerts").set({
                alertTitle: title,
                alertMessage: message, 
            });

            document.getElementById('waitSection').style.display = "initial";
            document.getElementById('alertInput').style.display = "none";

            var time = Number(alertSeconds) + (Number(alertMinutes) * 60) + (Number(alertHours) * 60 * 60),

            display = document.querySelector('#time');
            startTimer(time, display);

        } else {
            var alertHTML = `
            <div class="alert alert-danger" role="alert">
            The Server Manager Key is incorrect.
          </div>
            `;
            $('#alertSendError').html(alertHTML);
        }
    }

}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;

    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        console.log(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
            console.log("timer done");
        }
    }, 1000);
}
