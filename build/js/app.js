(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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

},{}],2:[function(require,module,exports){
/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

(function(global) {
  'use strict';

  var dateFormat = (function() {
      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g;
      var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
      var timezoneClip = /[^-+\dA-Z]/g;
  
      // Regexes and supporting functions are cached through closure
      return function (date, mask, utc, gmt) {
  
        // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
        if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
          mask = date;
          date = undefined;
        }
  
        date = date || new Date;
  
        if(!(date instanceof Date)) {
          date = new Date(date);
        }
  
        if (isNaN(date)) {
          throw TypeError('Invalid date');
        }
  
        mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);
  
        // Allow setting the utc/gmt argument via the mask
        var maskSlice = mask.slice(0, 4);
        if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
          mask = mask.slice(4);
          utc = true;
          if (maskSlice === 'GMT:') {
            gmt = true;
          }
        }
  
        var _ = utc ? 'getUTC' : 'get';
        var d = date[_ + 'Date']();
        var D = date[_ + 'Day']();
        var m = date[_ + 'Month']();
        var y = date[_ + 'FullYear']();
        var H = date[_ + 'Hours']();
        var M = date[_ + 'Minutes']();
        var s = date[_ + 'Seconds']();
        var L = date[_ + 'Milliseconds']();
        var o = utc ? 0 : date.getTimezoneOffset();
        var W = getWeek(date);
        var N = getDayOfWeek(date);
        var flags = {
          d:    d,
          dd:   pad(d),
          ddd:  dateFormat.i18n.dayNames[D],
          dddd: dateFormat.i18n.dayNames[D + 7],
          m:    m + 1,
          mm:   pad(m + 1),
          mmm:  dateFormat.i18n.monthNames[m],
          mmmm: dateFormat.i18n.monthNames[m + 12],
          yy:   String(y).slice(2),
          yyyy: y,
          h:    H % 12 || 12,
          hh:   pad(H % 12 || 12),
          H:    H,
          HH:   pad(H),
          M:    M,
          MM:   pad(M),
          s:    s,
          ss:   pad(s),
          l:    pad(L, 3),
          L:    pad(Math.round(L / 10)),
          t:    H < 12 ? 'a'  : 'p',
          tt:   H < 12 ? 'am' : 'pm',
          T:    H < 12 ? 'A'  : 'P',
          TT:   H < 12 ? 'AM' : 'PM',
          Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
          o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
          S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
          W:    W,
          N:    N
        };
  
        return mask.replace(token, function (match) {
          if (match in flags) {
            return flags[match];
          }
          return match.slice(1, match.length - 1);
        });
      };
    })();

  dateFormat.masks = {
    'default':               'ddd mmm dd yyyy HH:MM:ss',
    'shortDate':             'm/d/yy',
    'mediumDate':            'mmm d, yyyy',
    'longDate':              'mmmm d, yyyy',
    'fullDate':              'dddd, mmmm d, yyyy',
    'shortTime':             'h:MM TT',
    'mediumTime':            'h:MM:ss TT',
    'longTime':              'h:MM:ss TT Z',
    'isoDate':               'yyyy-mm-dd',
    'isoTime':               'HH:MM:ss',
    'isoDateTime':           'yyyy-mm-dd\'T\'HH:MM:sso',
    'isoUtcDateTime':        'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
    'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'
  };

  // Internationalization strings
  dateFormat.i18n = {
    dayNames: [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]
  };

function pad(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = '0' + val;
  }
  return val;
}

/**
 * Get the ISO 8601 week number
 * Based on comments from
 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
 *
 * @param  {Object} `date`
 * @return {Number}
 */
function getWeek(date) {
  // Remove time components of date
  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Change date to Thursday same week
  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

  // Take January 4th as it is always in week 1 (see ISO 8601)
  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

  // Change date to Thursday same week
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

  // Check if daylight-saving-time-switch occured and correct for it
  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  targetThursday.setHours(targetThursday.getHours() - ds);

  // Number of weeks between target Thursday and first Thursday
  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
  return 1 + Math.floor(weekDiff);
}

/**
 * Get ISO-8601 numeric representation of the day of the week
 * 1 (for Monday) through 7 (for Sunday)
 * 
 * @param  {Object} `date`
 * @return {Number}
 */
function getDayOfWeek(date) {
  var dow = date.getDay();
  if(dow === 0) {
    dow = 7;
  }
  return dow;
}

/**
 * kind-of shortcut
 * @param  {*} val
 * @return {String}
 */
function kindOf(val) {
  if (val === null) {
    return 'null';
  }

  if (val === undefined) {
    return 'undefined';
  }

  if (typeof val !== 'object') {
    return typeof val;
  }

  if (Array.isArray(val)) {
    return 'array';
  }

  return {}.toString.call(val)
    .slice(8, -1).toLowerCase();
};



  if (typeof define === 'function' && define.amd) {
    define(function () {
      return dateFormat;
    });
  } else if (typeof exports === 'object') {
    module.exports = dateFormat;
  } else {
    global.dateFormat = dateFormat;
  }
})(this);

},{}],3:[function(require,module,exports){
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
    $(".groupform").show();
  });

  $("#random").click(function(){
    $(".header").text("Random Bike");
    $("#colorSearch").hide();
    $("#allSearch").hide();
    $("#bike").hide();
    randomBike();
  });

  $("#allSearch").click(function(){
    $(".header").text("Search All Stolen Bikes");
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

},{"./../js/bikes.js":1,"dateformat":2}]},{},[3]);
