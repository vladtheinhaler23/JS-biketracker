var stolenBikes = require('./../js/bikes.js').stolenBikes;
var allStolenBikesByColor = require('./../js/bikes.js').allStolenBikesByColor;
var allStolenBikesByManu = require('./../js/bikes.js').allStolenBikesByManu;
var allStolenBikesByMat = require('./../js/bikes.js').allStolenBikesByMat;
var getCityAndState = require('./../js/bikes.js').getCityAndState;
var randomBike = require('./../js/bikes.js').randomBike;
var dateFormat = require('dateformat');

$(document).ready(function(){
  $('.datetimepicker1').datetimepicker({
    format: 'ddd, DD MMM YYYY HH:mm:ss'
  });

  var chartdisplay = function(data){
    $(".chart").html("<canvas id='myChart' width='200' height='200'></canvas><button class='btn-warning btn btn-lg' id='back'>Back</button>");
    var ctx = $("#myChart");
    var myBarChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        scales: {
                xAxes: [{
                        stacked: true
                }],
                yAxes: [{
                        stacked: true
                }]
            }
      }
    });
    $(".groupform").hide();
    $(".chart").fadeIn();
    $("#back").click(function(){
      $("#colorSearch").fadeIn();
      $("#allSearch").fadeIn();
      $(".chart").hide();
      $(".header").text("");
    });
  };


  var arrayOfColors = ['Black','Blue','Brown','Green','Orange','Pink','Purple','Red','Silver or Gray','Stickers Tape or Other Cover-up','Teal','White','Yellow or Gold'];
  var arrayOfManu = ['Schwinn', 'Giant', 'Trek', 'Specialized', 'Cannondale', 'Gt', 'Santa cruz', 'Scott', 'Yeti', 'Kona', 'Felt', 'Fuji', 'Bianchi'];
  var arrayOfMaterial = ['Wood or organic material', 'Titanium', 'Carbon or composite', 'Aluminum', 'Steel'];

  $("#colorSearch").click(function(){
    $(".header").text("Search Specific Color");
    $("#colorSearch").hide();
    $("#allSearch").hide();
    $("#specificbike").show();
    $("#bike").hide();
    $("#random").hide();
    $(".groupform").show();
  });

  $("#random").click(function(){
    $("#colorSearch").hide();
    $("#allSearch").hide();
    $("#bike").hide();
    randomBike();
  });

  $("#allSearch").click(function(){
    $(".header").text("Search All Stolen Bikes");
    $("#random").hide();
    $("#colorSearch").hide();
    $("#allSearch").hide();
    $("#specificbike").hide();
    $("#bike").show();
    $(".groupform").show();
  });

  $("#specificbike").submit(function(e){
    e.preventDefault();
    var color = $('#color').val();
    var zipcode = $('#zipcode1').val();
    var prox = $('#prox1').val();
    var datetime = Date.parse($('#datetime1').val())/1000;
    var datetimeOg = dateFormat($('#datetime1').val(), "mmmm dS, yyyy");
    var output = getCityAndState(zipcode);
    $(".header").html(color + " Bikes Info With in " + prox + " Miles of <span id='loc'></span> Since " + datetimeOg);
    stolenBikes(color, zipcode , prox, datetime, chartdisplay);

  });

  $("#bike").submit(function(e){
    e.preventDefault();
    var zipcode = $('#zipcode2').val();
    var sort = parseInt($('#sort').val());
    var prox = $('#prox2').val();
    var datetime = Date.parse($('#datetime2').val())/1000;
    console.log(zipcode);
    console.log(prox);
    console.log(datetime);
    console.log(arrayOfColors);
    if(sort === 1){
      allStolenBikesByColor(zipcode, prox, datetime, arrayOfColors, chartdisplay);
    }
    else if(sort === 2){
      allStolenBikesByManu(zipcode, prox, datetime, arrayOfManu, chartdisplay);
    }
    else{
      allStolenBikesByMat(zipcode, prox, datetime, arrayOfMaterial, chartdisplay);
    }

  });

});
