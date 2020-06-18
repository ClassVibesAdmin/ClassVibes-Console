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


function getSearchResults(searchType) {
    document.getElementById('askUserSection').style.display = "none";
    document.getElementById('loadingIndicator').style.display = "initial";

    var resultSearchText = document.getElementById('searchInput').value;

    var noResultsHTML = `
    <div class="d-flex justify-content-center" style="margin-top: 12%;">
    <img src="img/undraw_file_searching_duff.svg" width="20%">


</div>

<center>
    <h3 style="margin-top: 2%;">No Search Results</h3>
</center>
    `;

    setTimeout(function () {

        if (searchType == 'district') {
            firebase.firestore().collection("Districts").doc(resultSearchText).get().then((documentSnapshot) => {
                console.log(documentSnapshot.data());

                var value = documentSnapshot.data();

                if (value == undefined || value == null) {
                    document.getElementById('searchResultsSection').innerHTML = noResultsHTML;
                } else {
                    var districtName = value.districtName;
                    var districtStatus = value.status;

                    var districtCardHTML = `
                    <div id="searchResultsSection">
                            <div class="col-xl-12 col-md-8 mb-4">
                                <div class="card border-left-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    District</div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800">${districtName}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                    

                    if(districtStatus == "Deactivated"){
                        var activateHTML = `
                        
                        `;
                    } 
                    else if (districtStatus == "Activated"){

                    }
                }

            });
        }

        else if (searchType == "teacher") {
            firebase.firestore().collection("Teachers").doc(resultSearchText).get().then((documentSnapshot) => {
                console.log(documentSnapshot.data());
            });
        }

        document.getElementById('loadingIndicator').style.display = "none";
        document.getElementById('searchResults').style.display = "initial";
    }, 1000);



    document.getElementById('searchHeaderResults').innerHTML = "Search Results for " + resultSearchText + "<span class = 'badge badge-primary' style = 'margin-left: 10px; margin-top: -10px'>District Accounts</span>";




}   