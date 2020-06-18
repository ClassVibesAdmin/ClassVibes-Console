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

                                        <div class="col-auto">
                                        <section id='activateButton'>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;


                    $(districtCardHTML).appendTo('#searchResultsSection');
                    
                    console.log(districtStatus);

                if(districtStatus == "Deactivated"){
                    var activateHTML = `
                    <a href="#" class="btn btn-primary btn-icon-split btn-lg"
                    data-toggle="modal" data-target="#activateModal">
                    <span class="text">Activate</span>
                </a>

                <!-- Activation Modal -->
                <div class="modal fade" id="activateModal" tabindex="-1"
                    role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    Activate District</h5>
                                <button type="button" class="close"
                                    data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <!--MODAL BODY START-->
                                <h6>Activation Valid For</h6>


                                <div class="row">

                                    <div class="col">
                                        <input type="text"
                                            class="form-control bg-light border-0 small"
                                            placeholder="Years" aria-label="Search"
                                            aria-describedby="basic-addon2">

                                    </div>

                                    <div class="col">
                                        <input type="text"
                                            class="form-control bg-light border-0 small"
                                            placeholder="Months" aria-label="Search"
                                            aria-describedby="basic-addon2">

                                    </div>

                                    <div class="col">
                                        <input type="text"
                                            class="form-control bg-light border-0 small"
                                            placeholder="Days" aria-label="Search"
                                            aria-describedby="basic-addon2">

                                    </div>

                                </div>

                                <h6 style="margin-top: 20px;">Transaction ID</h6>

                                <input type="text"
                                    class="form-control bg-light border-0 small"
                                    placeholder="ID" aria-label="Search"
                                    aria-describedby="basic-addon2">


                                    <h6 style="margin-top: 20px;">Transaction Amount</h6>

                                    <input type="text"
                                        class="form-control bg-light border-0 small"
                                        placeholder="Ammount" aria-label="Search"
                                        aria-describedby="basic-addon2">


                                <h6 style="margin-top: 20px;">Activation Key</h6>

                                <input type="password"
                                    class="form-control bg-light border-0 small"
                                    placeholder="Code" aria-label="Search"
                                    aria-describedby="basic-addon2">

                                <!--MODAL BODY END-->
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                    data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary"
                                    data-dismiss="modal">Activate Account</button>
                            </div>
                        </div>
                    </div>
                </div>
                    `;

                    $('#activateButton').html(activateHTML);
                } 
                else if (districtStatus == "Activated"){
                    var deactivateHTML = `
                    <a href="#" class="btn btn-danger btn-icon-split btn-lg"
                    data-toggle="modal" data-target="#deActivateModal">
                    <span class="text">Deactivate</span>
                </a>

                <!--DEACTIVATION MODAL-->
                <!-- Modal -->
                <div class="modal fade" id="deActivateModal" tabindex="-1"
                    role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    Deactivate District</h5>
                                <button type="button" class="close"
                                    data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <!--MODAL BODY START-->

                                <h6 style="margin-top: 10px;">Deactivation Key</h6>

                                <input type="password"
                                    class="form-control bg-light border-0 small"
                                    placeholder="Code" aria-label="Search"
                                    aria-describedby="basic-addon2">

                                <!--MODAL BODY END-->
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                    data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger"
                                    data-dismiss="modal">Deactivate Account</button>
                            </div>
                        </div>
                    </div>
                </div>
                    `;

                    $('#activateButton').html(deactivateHTML);
                }
            }

        });
    }

    else if (searchType == "teacher") {
        firebase.firestore().collection("Teachers").doc(resultSearchText).get().then((documentSnapshot) => {
            console.log(documentSnapshot.data());
        });
    }

    setTimeout(function () {
        document.getElementById('loadingIndicator').style.display = "none";
        document.getElementById('searchResults').style.display = "initial";
    }, 1500);



    document.getElementById('searchHeaderResults').innerHTML = "Search Results for " + resultSearchText + "<span class = 'badge badge-primary' style = 'margin-left: 10px; margin-top: -10px'>District Accounts</span>";




}   