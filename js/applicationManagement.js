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


function getLiveSeverAlerts(){
    firebase.firestore().collection('Application Management').doc("ServerAlerts").onSnapshot(function(result){

        var data = result.data();

        var toastHTML = `
        <div aria-live="polite" aria-atomic="true" style="position: absolute; min-height: 200px;">
  <div class="toast" style="position: absolute; top: 0; right: 100%;" id = "alertToast">
    <div class="toast-header">
      <img src="..." class="rounded mr-2" alt="...">
      <strong class="mr-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">
      Hello, world! This is a toast message.
    </div>
  </div>
</div>
        `;

        $(toastHTML).appendTo('#pageBody');

        $('#alertToast').toast('show')



        if(data == undefined || data == null){
           
        } else {
            $(toastHTML).appendTo('#pageBody');
        }

        console.log(data);
    });
}