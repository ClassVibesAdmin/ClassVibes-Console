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



function signInWithEmail() {
  var username = document.getElementById('usernameInput').value;
  var password = document.getElementById('passwordInput').value;
  var otpInput = document.getElementById('otpInput').value;

  let xhr = new XMLHttpRequest();
  xhr.open('GET', `https://console.classvibes.net/verifyAuth-2FA?userToken=${otpInput}`, true);
  xhr.send();

  xhr.onreadystatechange = processRequest;

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText);

      if (response == true && response != null && response != undefined) {
        //var secretActual = 'MIICwjCCAaoCAQAwfTELMAkGA1UEBhMCVVMxFzAVBgNVBAMMDmNsYXNzdmliZXMu';

        if (username == 'admin@classvibes.net') {

          firebase.auth().signInWithEmailAndPassword(username, password).then(function (result) {
            console.log(result);
            console.log(result.uid);

            $("#loginAlert").html("");
           
              console.log("Login Success");
              $("#loginAlert").html("");

              window.location = "/dashboard";
            

          }).catch(function (error) {

            var errorHTML = `
<div class="alert alert-danger" role="alert" style="margin-top: 20px;">
The credentials are invalid
</div>
`;

            $("#loginAlert").html(errorHTML);
            console.log(error);
          });
        } else {
          var errorHTML = `
  <div class="alert alert-danger" role="alert" style="margin-top: 20px;">
  This account is not a developer account
</div>
  `;

          $("#loginAlert").html(errorHTML);
        }
      } else {
        var errorHTML = `
        <div class="alert alert-danger" role="alert" style="margin-top: 20px;">
        OTP Code is not valid
      </div>
        `;
      
                $("#loginAlert").html(errorHTML);
      }

      console.log(response)
    }
  }



}