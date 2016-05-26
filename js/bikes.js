
var fillData = function(arrayOfLabels, arrayOfResults, chartdisplay){
  var data = {
      labels: arrayOfLabels,
      datasets: [
          {
              label: "Number of Bikes",
              backgroundColor: "#AE2228",
              borderColor: "#8B1B20",
              borderWidth: 3,
              hoverBackgroundColor: "#611216",
              hoverBorderColor: "#3A0A0D",
              data: arrayOfResults,
          }
      ]

  };
  console.log(arrayOfResults);
  chartdisplay(data);
};

var randomBike2 = function(){
  id = Math.floor((Math.random() * 78173) + 1);
  $.get('https://bikeindex.org:443/api/v2/bikes/' + id).then(function(response, x) {
      if(response.bike.large_img === null){
        randomBike2();
      }else{
        $("#picframe").html("<img src='" + response.bike.large_img + "' class='img-responsive photo'>");
      }
  }).fail(function(error){
    randomBike2();
  });
};



exports.stolenBikes = function(color, zipcode , prox, datetime, chartdisplay){
  $.get('https://bikeindex.org:443/api/v2/bikes_search/count?colors=' + color + '&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime, function(response) {
    console.log(response);
      var arrayOfLabels = ["Total " + color + " Bikes", "Total " + color + " Bikes Stolen", color + " Bikes Stolen near You"];
      var arrayOfResults = [response.non_stolen, response.stolen, response.proximity];
      fillData(arrayOfLabels, arrayOfResults, chartdisplay);
     });
};


exports.allStolenBikesByColor = function(zipcode, prox, datetime, arrayOfColors, chartdisplay){

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

exports.allStolenBikesByManu = function(zipcode, prox, datetime, arrayOfManu, chartdisplay){
    var arrayOfResults = [];
      arrayOfManu.forEach(function(value, index){
        $.get('https://bikeindex.org:443/api/v2/bikes_search/count?manufacturer=' + value + '&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime).then(function(response) {
          arrayOfResults[index] = response.proximity;
            if(arrayOfResults.length === arrayOfManu.length){
              fillData(arrayOfManu, arrayOfResults, chartdisplay);
            }
        });
      });
    };

exports.allStolenBikesByMat = function(zipcode, prox, datetime, arrayOfMaterial, chartdisplay){
    var arrayOfResults = [];
      arrayOfMaterial.forEach(function(value, index){
        $.get('https://bikeindex.org:443/api/v2/bikes_search/count?query=' + value + '&proximity=' + zipcode + '&proximity_square=' + prox +'&stolen_after=' + datetime).then(function(response) {
          arrayOfResults[index] = response.proximity;
            if(arrayOfResults.length === arrayOfMaterial.length){
              fillData(arrayOfMaterial, arrayOfResults, chartdisplay);
            }
        });
      });
    };

exports.randomBike = function(){
  randomBike2();
};

exports.getCityAndState = function(zipcode){
  var zip = zipcode;
    var lat;
    var lng;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': zip }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            geocoder.geocode({'latLng': results[0].geometry.location}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                     var loc = getCityState(results);
                     $("#loc").text(loc);
                }
            }
        });
        }
    });

function getCityState(results)
    {
        var a = results[0].address_components;
        var city, state;
        for(i = 0; i <  a.length; ++i)
        {
           var t = a[i].types;
           if(compIsType(t, 'administrative_area_level_1'))
              state = a[i].long_name; //store the state
           else if(compIsType(t, 'locality'))
              city = a[i].long_name; //store the city
        }
        return (city + ', ' + state)
    }

function compIsType(t, s) {
       for(z = 0; z < t.length; ++z)
          if(t[z] == s)
             return true;
       return false;
    }
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
