/* ================================
Week 6 Assignment: Midterm Function Signatures
================================ */



/* =====================
  Map Setup
===================== */

var map = L.map('map', {
  center: [39.917324, 116.397330],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
  Grab the data, parse it, and show data on the map
===================== */
var dataset = 'https://raw.githubusercontent.com/zhaoluyun/datasets/master/geojson/housingprice_Beijing.geojson';

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    var myFeatureGroup = L.geoJson(parsedData, {
      onEachFeature: eachFeature,
      style: myStyle,
      filter: myFilter
    }).addTo(map);
  });
});

var myStyle = function(feature) {
}; //for different price level or housing area level, give different color.


var eachFeature = function(feature, layer) {
  layer.on('click', function (e) {
  });
};// when click on one point, show the properties of that housing at side bar

var myFilter = function(feature) {
//  if () {
//  return true;
//  }
}; //show buildings that built after 2000 or school district housing

var showPage2 = function() {
  $('#page1').hide();
  $('#page3').hide();
  $('#page4').hide();
  $('#page5').hide();
  $('#page2').show();
};


$('#next').click(function(){
showPage2();
});
