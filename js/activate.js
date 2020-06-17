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


function getSearchResults(){
    document.getElementById('askUserSection').style.display = "none";
    document.getElementById('loadingIndicator').style.display = "initial";

    var resultSearchText = document.getElementById('searchInput').value;

    setTimeout(function(){
        document.getElementById('loadingIndicator').style.display = "none";
        document.getElementById('searchResults').style.display = "initial";
   }, 1000); 

   document.getElementById('searchHeaderResults').innerHTML = "Search Results for " + resultSearchText + "<span class = 'badge badge-primary' style = 'margin-left: 20px'>District Accounts</span>";




}   