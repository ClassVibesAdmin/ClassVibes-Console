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


function getDashboardData(){
  var url = 'https://api-v1.classvibes.net/api/onlineUsers'

  $.get(url, function(data, err){
    console.log(data)

    $('#online-users').html(data['message'])

  })
    
  firebase.firestore().collection("Application Management").doc("Statistics").onSnapshot((documentSnapshot) => {

    var value = documentSnapshot.data();

    
    var mobile = 0
    var web = 0
    var totalUsers = 0

    var url = 'https://api-v1.classvibes.net/api/platformStats'

    $.get(url, function(data, err){
      console.log(data)

      var message = data['message']

      mobile = message['mobile']
      web = message['web']

      totalUsers = message['total']

      if(mobile > web){
        $('#popular-platform').html("Mobile")
      } else if(web >= mobile){
        $('#popular-platform').html("Web")
      }


      
    var totalEarnings = value.totalEarnings;
    
    var districtsTotal = value.totalDistricts;
    //var mobile = value.mobileUsers;
    //var web = value.webUsers;

    var roundedTotal = parseFloat(totalEarnings).toFixed(2);

    $('#totalEarnings').html("$" + roundedTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('#totalUsers').html(totalUsers);
    $('#totalDistricts').html(districtsTotal);

    // Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("platformsPieChart");

console.log(mobile);
console.log(web);

if(mobile == 0 && web == 0){
  ctx.outerHTML = `<center style = 'margin-top: 23%;'><h4 style = 'color: grey'>No data</h4></center>`;
}
  var monthEarningValues = value;

  console.log("EARNINGS: " +  monthEarningValues.junEarnings);

  console.log("//////");
  console.log(monthEarningValues.junEarnings == undefined ? 0: monthEarningValues.junEarnings);

    var jan = monthEarningValues.janEarnings == undefined ? 0: monthEarningValues.janEarnings;
    var feb = monthEarningValues.febEarnings == undefined ? 0: monthEarningValues.febEarnings;
    var mar = monthEarningValues.marEarnings == undefined ? 0: monthEarningValues.marEarnings;
    var apr = monthEarningValues.aprEarnings == undefined ? 0: monthEarningValues.aprEarnings;
    var may = monthEarningValues.mayEarnings == undefined ? 0: monthEarningValues.mayEarnings;
    var jun = monthEarningValues.junEarnings == undefined ? 0: monthEarningValues.junEarnings;
    var jul = monthEarningValues.julEarnings == undefined ? 0: monthEarningValues.julEarnings;
    var aug = monthEarningValues.augEarnings == undefined ? 0: monthEarningValues.augEarnings;
    var sep = monthEarningValues.sepEarnings == undefined ? 0: monthEarningValues.sepEarnings;
    var oct = monthEarningValues.octEarnings == undefined ? 0: monthEarningValues.octEarnings;
    var nov = monthEarningValues.novEarnings == undefined ? 0: monthEarningValues.novEarnings;
    var dec = monthEarningValues.decEarnings == undefined ? 0: monthEarningValues.decEarnings;

var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Mobile", "Web"],
    datasets: [{
      data: [mobile, web],
      backgroundColor: ['#4e73df', '#1cc88a',],
      hoverBackgroundColor: ['#2e59d9', '#17a673'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Area Chart Example
var ctx = document.getElementById("earningsBarChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Earnings",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '$' + number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});



    console.log(totalEarnings);

    })


  });
}

