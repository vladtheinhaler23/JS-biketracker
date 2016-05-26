var async = require("async");
exports.stolenBikes = function(color, zipcode , prox, datetime, chartdisplay){
  $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=' + color + '&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
    console.log(response);
    var data = {
        labels: ["Total " + color + " Bikes", "Total " + color + " Bikes Stolen", color + " Bikes Stolen near You"],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [response.non_stolen, response.stolen, response.proximity],
            }
        ]

    };
    chartdisplay(data);
  });
};
var fillData = function(arrayOfColors, arrayOfResults, chartdisplay){
  var data = {
      labels: arrayOfColors,
      datasets: [
          {
              label: "My First dataset",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: arrayOfResults,
          }
      ]

  };
  console.log(arrayOfResults);
  chartdisplay(data);
};
exports.allStolenBikes = function(zipcode, prox, datetime, arrayOfColors, chartdisplay){

  var arrayOfResults = [];
    arrayOfColors.forEach(function(value, index){
      $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=' + value + '&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime).then(function(response) {
        arrayOfResults[index] = response.proximity;
        if(arrayOfResults.length === arrayOfColors.length){
          fillData(arrayOfColors, arrayOfResults, chartdisplay);
        }
      });
    });
  };
            // $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=black&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
            //   console.log(response.proximity);
            //   arrayOfResults[0] = response.proximity;
            //   console.log(" hey" + arrayOfResults.length);
            //   if(arrayOfResults.length === arrayOfColors.length){
            //     fillData(arrayOfColors, arrayOfResults, chartdisplay);
            //   }
            // });
            // $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=blue&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
            //   console.log(response.proximity);
            //   arrayOfResults[1] = response.proximity;
            //   if(arrayOfResults.length === arrayOfColors.length){
            //     fillData(arrayOfColors, arrayOfResults, chartdisplay);
            //   }
            // });
            // $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=brown&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
            //   console.log(response.proximity);
            //   arrayOfResults[2] = response.proximity;
            //   if(arrayOfResults.length === arrayOfColors.length){
            //     fillData(arrayOfColors, arrayOfResults, chartdisplay);
            //   }
            // });
            // $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=green&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
            //   console.log(response.proximity);
            //   arrayOfResults[3] = response.proximity;
            //   if(arrayOfResults.length === arrayOfColors.length){
            //     fillData(arrayOfColors, arrayOfResults, chartdisplay);
            //   }
            // });
            // $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=orange&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
            //   console.log(response.proximity);
            //   arrayOfResults[4] = response.proximity;
            //   if(arrayOfResults.length === arrayOfColors.length){
            //     fillData(arrayOfColors, arrayOfResults, chartdisplay);
            //   }
            // });
            // $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=pink&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
            //   console.log(response.proximity);
            //   arrayOfResults[5] = response.proximity;
            //   if(arrayOfResults.length === arrayOfColors.length){
            //     fillData(arrayOfColors, arrayOfResults, chartdisplay);
            //   }
            // });
            // $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=purple&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
            //   console.log(response.proximity);
            //   arrayOfResults[6] = response.proximity;
            //   if(arrayOfResults.length === arrayOfColors.length){
            //     fillData(arrayOfColors, arrayOfResults, chartdisplay);
            //   }
            // });
            // $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=red&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
            //   console.log(response.proximity);
            //   arrayOfResults[7] = response.proximity;
            //   if(arrayOfResults.length === arrayOfColors.length){
            //     fillData(arrayOfColors, arrayOfResults, chartdisplay);
            //   }
            // });
            // $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=silver%20or%20gray&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
            //   console.log(response.proximity);
            //   arrayOfResults[8] = response.proximity;
            //   if(arrayOfResults.length === arrayOfColors.length){
            //     fillData(arrayOfColors, arrayOfResults, chartdisplay);
            //   }
            // });
            // $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=Stickers%20tape%20or%20other%20cover-up&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
            //   console.log(response.proximity);
            //   arrayOfResults[9] = response.proximity;
            //   if(arrayOfResults.length === arrayOfColors.length){
            //     fillData(arrayOfColors, arrayOfResults, chartdisplay);
            //   }
            // });
            // $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=teal&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
            //   console.log(response.proximity);
            //   arrayOfResults[10] = response.proximity;
            //   if(arrayOfResults.length === arrayOfColors.length){
            //     fillData(arrayOfColors, arrayOfResults, chartdisplay);
            //   }
            // });
            // $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=white&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
            //   console.log(response.proximity);
            //   arrayOfResults[11] = response.proximity;
            //   if(arrayOfResults.length === arrayOfColors.length){
            //     fillData(arrayOfColors, arrayOfResults, chartdisplay);
            //   }
            // });
            // $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=yellow%20or%20gold&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
            //   console.log(response.proximity);
            //   arrayOfResults[12] = response.proximity;
            //   if(arrayOfResults.length === arrayOfColors.length){
            //     fillData(arrayOfColors, arrayOfResults, chartdisplay);
            //   }
            // });
