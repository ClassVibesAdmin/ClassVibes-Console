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

function getSearchResultsReciepts() {
    var result = document.getElementById('searchInputReciepts').value;

    var noResultsHTML = `
    <div class="d-flex justify-content-center" style="margin-top: 12%;">
    <img src="img/undraw_file_searching_duff.svg" width="20%">


</div>

<center>
    <h3 style="margin-top: 2%;">No Search Results</h3>
</center>
    `;


    document.getElementById('searchPage').style.display = "none";
    document.getElementById('loadingIndicator').style.display = "initial";

    firebase.firestore().collection("TransactionManagement").doc(result.toString()).get().then((documentSnapshot) => {
        var data = documentSnapshot.data();

        if (data == null || data == undefined) { //NO SEARCH RESULTS

            document.getElementById('searchResultsPage').innerHTML = noResultsHTML; 

        } else { // RESULTS FOUND
            var accountType = data['Account Type'];
            var recipientID = data['Recipient ID'];
            var planActivated = data['planActivated'];
            var planExpires = data['planExpire'];
            var planName = data['planName'];
            var transactionAmount = data['transactionAmount'];

            console.log("RESULTS FOUND");

            var resultsHTML = `
            
            <div class="col-xl-12 col-md-8 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Recipt</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800" id = "recieptID">ID: ${result}</div>
                  </div>
                  <div class="col-auto">
                    <p>
                      <a class="btn btn-primary" style="margin-top: 15px;" data-toggle="collapse"
                        href="#recieptView" role="button" aria-expanded="false"
                        aria-controls="multiCollapseExample1">View Reciept</a>
                    </p>
                  </div>
                </div>
              </div>

              <div class="row" style="margin-left: 10px;">
                <div class="col">
                  <div class="collapse multi-collapse" id="recieptView">
                    <div class="row">

                      <div class="col">
                        <h5 style="font-weight: 700;">Account Type</h5>
                        <h5 id="accountTypeInput">${accountType}</h5>
                      </div>

                      <div class="col">
                        <h5 style="font-weight: 700;">ID Of Recipient</h5>
                        <h5 id="recipientID">${recipientID}</h5>
                      </div>

                      <div class="col">
                        <h5 style="font-weight: 700;">Plan Activated</h5>
                        <h5 id="planActivated">${planActivated}</h5>
                      </div>
                    </div>
                    <div class="row" style="margin-top: 20px;">

                      <div class="col">
                        <h5 style="font-weight: 700;">Plan Expires</h5>
                        <h5 id="planExpires">${planExpires}</h5>
                      </div>

                      <div class="col">
                        <h5 style="font-weight: 700;">Plan Name</h5>
                        <h5 id="planName">${planName}</h5>
                      </div>

                      <div class="col">
                        <h5 style="font-weight: 700;">Transaction Amount</h5>
                        <h5 id="transactionAmount">${transactionAmount}</h5>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
            `;

            $('#searchResultsSection').html(resultsHTML);

        }   
    });

    
    setTimeout(function () {
        document.getElementById('loadingIndicator').style.display = "none";
        document.getElementById('searchResultsPage').style.display = "initial";
    }, 2000);
}