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


                $('#searchResultsSection').html(districtCardHTML);

                console.log(districtStatus);

                if (districtStatus == "Deactivated") {
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
                                            aria-describedby="basic-addon2" id = "yearsInput">

                                    </div>

                                    <div class="col">
                                        <input type="text"
                                            class="form-control bg-light border-0 small"
                                            placeholder="Months" aria-label="Search"
                                            aria-describedby="basic-addon2" id = "monthsInput">

                                    </div>

                                    <div class="col">
                                        <input type="text"
                                            class="form-control bg-light border-0 small"
                                            placeholder="Days" aria-label="Search"
                                            aria-describedby="basic-addon2" id = "daysInput">

                                    </div>

                                </div>

                                <h6 style="margin-top: 20px;">Transaction ID</h6>

                                <input type="text"
                                    class="form-control bg-light border-0 small"
                                    placeholder="ID" aria-label="Search"
                                    aria-describedby="basic-addon2" id = "transactionIDInput">


                                    <h6 style="margin-top: 20px;">Transaction Amount</h6>

                                    <input type="text"
                                        class="form-control bg-light border-0 small"
                                        placeholder="Ammount" aria-label="Search"
                                        aria-describedby="basic-addon2" id = "transactionAmountInput">


                                <h6 style="margin-top: 20px;">Activation Key</h6>

                                <input type="password"
                                    class="form-control bg-light border-0 small"
                                    placeholder="Code" aria-label="Search"
                                    aria-describedby="basic-addon2" id = "activationKey">

                                    <div id = "activationError" style = "margin-top: 10px">
                                   
                                    </div>

                                <!--MODAL BODY END-->
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                    data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary"
                                     onclick = "activateAccount('district', ${resultSearchText})">Activate Account</button>
                            </div>
                        </div>
                    </div>
                </div>
                    `;

                    $('#activateButton').html(activateHTML);
                }
                else if (districtStatus == "Activated") {
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
                                    aria-describedby="basic-addon2" id = "deactivationKeyInput">

                                <div id = 'deActivationError' style = "margin-top: 10px">
                                
                                </div>

                                <!--MODAL BODY END-->
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                    data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" onclick = "deactivate('district', '${resultSearchText}')">Deactivate Account</button>
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


function activateAccount(activationType, activateID) {

    var activationID = activateID.toString()

    var years = document.getElementById('yearsInput').value;
    var months = document.getElementById('monthsInput').value;
    var days = document.getElementById('daysInput').value;
    var transactionID = document.getElementById('transactionIDInput').value;
    var transactionAmount = document.getElementById('transactionAmountInput').value;
    var activationKey = document.getElementById('activationKey').value;

    console.log(years);
    console.log(months);
    console.log(days);

    //Today's Date
    var dateNow = new Date();

    //Format Today's date (Activation Date)
    var ddActivated = String(dateNow.getDate()).padStart(2, '0');
    var mmActivated = String(dateNow.getMonth() + 1).padStart(2, '0'); 
    var yyyyActivated = dateNow.getFullYear();

    activationDateFormatted = ddActivated + '/' + mmActivated + '/' + yyyyActivated;


    //Calculate Expire Date
    var yearNow = dateNow.getFullYear();
    var monthNow = dateNow.getMonth();
    var dayNow = dateNow.getDate();
    var expireDate = new Date(yearNow + years, monthNow + months, dayNow + days);

    //Format Expire Date
    var ddExpire = String(expireDate.getDate()).padStart(2, '0');
    var mmExpire = String(expireDate.getMonth() + 1).padStart(2, '0'); 
    var yyyyExpire = expireDate.getFullYear();

    expireDateFormatted = mmExpire + '/' + ddExpire + '/' + yyyyExpire;

    console.log(expireDate);
    console.log(expireDateFormatted);

    //Get month Abbbreviation
    Date.prototype.monthNames = [
        "january", "february", "march",
        "april", "may", "june",
        "july", "august", "september",
        "october", "november", "december"
    ];
    
    Date.prototype.getMonthName = function() {
        return this.monthNames[this.getMonth()];
    };

    Date.prototype.getShortMonthName = function () {
        return this.getMonthName().substr(0, 3);
    };
    
    var d = new Date();
    var monthAbbreviation = d.getShortMonthName();


    if(activationKey == 'XlNm8q/Dkxy9tdoSeexYY/sM/VQ='){

        $('#activationError').html("");

        if (activationType == 'district') {

            //Activates Plan in district Doc

            console.log('Activates Plan in district Doc');

            firebase.firestore().collection('Districts').doc(activationID).update({
                "status": "Activated",
    
            });

            var districtPlanDetails = {
                "planStatus": "Activated",
                "planActivated": activationDateFormatted,
                "planExpire": expireDateFormatted,
                "planName" : "District Plan Yearly",
            }

            firebase.firestore().collection('Districts').doc(activationID).update({
                planDetails: districtPlanDetails
    
            });
            
            //Adds transaction receipt

            console.log('Adds transaction receipt');
            firebase.firestore().collection('TransactionManagement').doc(transactionID.toString()).set({
                "districtID": activationID,
                "planActivated": activationDateFormatted,
                "planExpire": expireDateFormatted,
                "planName" : "District Plan Yearly",
                "transactionAmount": transactionAmount,
                "transactionID": transactionID
            });

            //Adds new transaction to total

            const increment = firebase.firestore.FieldValue.increment(Number(transactionAmount));

            var monthChild = monthAbbreviation + "Earnings";

            var updateChild = {};

            updateChild.monthChild = increment

            console.log('Adds new transaction to total');

            firebase.firestore().collection('Application Management').doc('Statistics').update({
               "totalEarnings": increment,
            });

            if(monthChild == "janEarnings"){
                firebase.firestore().collection('Application Management').doc('Statistics').update({
                    "janEarnings": increment,
                 });
            } 

            else if(monthChild == 'febEarnings'){
                firebase.firestore().collection('Application Management').doc('Statistics').update({
                    "febEarnings": increment,
                 });
            }

            else if(monthChild == 'marEarnings'){
                firebase.firestore().collection('Application Management').doc('Statistics').update({
                    "marEarnings": increment,
                 });
            }

            else if(monthChild == 'aprEarnings'){
                firebase.firestore().collection('Application Management').doc('Statistics').update({
                    "aprEarnings": increment,
                 });
            }
            else if(monthChild == 'mayEarnings'){
                firebase.firestore().collection('Application Management').doc('Statistics').update({
                    "mayEarnings": increment,
                 }); 
            }
            else if(monthChild == 'junEarnings'){
                firebase.firestore().collection('Application Management').doc('Statistics').update({
                    "junEarnings": increment,
                 });
            }
            else if(monthChild == 'julEarnings'){
                firebase.firestore().collection('Application Management').doc('Statistics').update({
                    "julEarnings": increment,
                 });
            }
            else if(monthChild == 'augEarnings'){
                firebase.firestore().collection('Application Management').doc('Statistics').update({
                    "augEarnings": increment,
                 });
            }
            else if(monthChild == 'sepEarnings'){
                firebase.firestore().collection('Application Management').doc('Statistics').update({
                    "sepEarnings": increment,
                 });
            }

            else if(monthChild == 'octEarnings'){
                firebase.firestore().collection('Application Management').doc('Statistics').update({
                    "octEarnings": increment,
                 });
            }
            else if(monthChild == 'novEarnings'){
                firebase.firestore().collection('Application Management').doc('Statistics').update({
                    "novEarnings": increment,
                 });
            }
            else if(monthChild == 'decEarnings'){
                firebase.firestore().collection('Application Management').doc('Statistics').update({
                    "decEarnings": increment,
                 });
            }

            $('#activateModal').modal('toggle');

            getSearchResults('district');

    
        }
    } else {
        console.log("Activation ID Is invalid");

        var errorHTMLActivation = `
        <div class="alert alert-danger" role="alert">
        Activation Key is invalid
      </div>
        `;

        $('#activationError').html(errorHTMLActivation);
    }
}

function deactivate(deactiveType, deactivationID){


    var deactivationKey = document.getElementById('deactivationKeyInput').value;

    if(deactivationKey == "XlNm8q/Dkxy9tdoSeexYY/sM/VQ==994jmc903t48h"){
        $('#deActivationError').html("");

        console.log(deactivationKey);
        if(deactiveType == "district"){
            firebase.firestore().collection('Districts').doc(deactivationID.toString()).update({
                "status": "Deactivated"
            });

            $('#activateModal').modal('toggle');

            //document.getElementById('loadingIndicator').style.display = "none";

            setTimeout(function(){
                //getSearchResults('district');
                //document.getElementById('searchResults').style.display = "initial";
           }, 2000); 
            
        }
    } else {

        var errorHTMLActivation = `
        <div class="alert alert-danger" role="alert">
        Deactivation Key is invalid
      </div>
        `;

        $('#deActivationError').html(errorHTMLActivation);
    }

  
  }