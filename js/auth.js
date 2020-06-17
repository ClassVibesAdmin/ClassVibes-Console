function initializeFirebase(){
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



function signInWithEmail(){
    var username = document.getElementById('usernameInput').value;
    var password = document.getElementById('passwordInput').value;
    var secret = document.getElementById('developerSecretInput').value;

    var secretActual = 'MIICwjCCAaoCAQAwfTELMAkGA1UEBhMCVVMxFzAVBgNVBAMMDmNsYXNzdmliZXMu';

    firebase.auth().signInWithEmailAndPassword(username, password).then(function(result) {
        console.log(result);
        if(username == "admin@classvibes.net"){
            $("#loginAlert").html("");
            if(secret != secretActual){
                var errorHTML = `
                <div class="alert alert-danger" role="alert" style="margin-top: 20px;">
                Developer Secret is invalid
              </div>
                `;
            
                $("#loginAlert").html(errorHTML);
            } else {
                console.log("Login Success");
                $("#loginAlert").html("");

                window.location = "dashboard.html";
            }
        }
  }).catch(function(error) {

    var errorHTML = `
    <div class="alert alert-danger" role="alert" style="margin-top: 20px;">
    The credentials are invalid
  </div>
    `;

    $("#loginAlert").html(errorHTML);
    console.log(error);
  });

}