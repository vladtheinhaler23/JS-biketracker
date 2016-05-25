var stolenBikes = require('./../js/bikes.js').stolenBikes;
var allStolenBikes = require('./../js/bikes.js').allStolenBikes;

$(document).ready(function(){
  $('.datetimepicker1').datetimepicker({
    format: 'ddd, DD MMM YYYY HH:mm:ss'
  });

  var chartdisplay = function(data){
    $(".chart").html("<canvas id='myChart' width='300' height='300'></canvas><button class='btn-warning btn btn-lg' id='back'>Back</button>");
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
    });
  };


  var arrayOfColors = ['black','blue','brown','green','orange','pink','purple','red','silver or gray','Stickers tape or other cover-up','teal','white','yellow or gold'];

  $("#colorSearch").click(function(){
    $("#colorSearch").hide();
    $("#allSearch").hide();
    $("#specificbike").show();
    $("#bike").hide();
    $(".groupform").show();
  });

  $("#allSearch").click(function(){
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
    stolenBikes(color, zipcode , prox, datetime, chartdisplay);

  });

  $("#bike").submit(function(e){
    e.preventDefault();
    var zipcode = $('#zipcode2').val();
    var prox = $('#prox2').val();
    var datetime = Date.parse($('#datetime2').val())/1000;
    console.log(zipcode);
    console.log(prox);
    console.log(datetime);
    console.log(arrayOfColors);
    allStolenBikes(zipcode, prox, datetime, arrayOfColors, chartdisplay);

  });

});
