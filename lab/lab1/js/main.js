/* =====================

## Task 1

Load the dataset into our application. Set the dataset variable initialized
below to https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/geojson/philadelphia-garbage-collection-boundaries.geojson

You should now have GeoJSON data projected onto your map!

## Task 2

Style each garbage collection area with a different color depending on what day
of the week garbage collection occurs. For example, all areas with Monday
garbage collection could be red, all areas with Tuesday garbage collection could
be blue, etc.

The myStyle function should return an object that contains style information.
For example, if you add the following line inside of the myStyle function, every
feature should be colored red.

return {fillColor: 'red'}

Other options for styling include opacity and weight. For a full list, see:
http://leafletjs.com/reference.html#path

For our myStyle function, we want a different fillColor to be returned depending
on the day of the week. If you need help, review http://leafletjs.com/examples/geojson.html for
working examples of this function.

## Task 3

You might have noticed that two of the features we are mapping have empty
strings as their value for collection date. These will probably have the default
style on your map, not the new styles you defined for the days of the week.

Our map is better than that. Let's filter out the junk data.

Check out the myFilter function. This function is similar to the Underscore
_.filter() function. The filter loops through each feature in your GeoJSON file.
For each feature, when the function returns true, that feature is added to the
map. When it does not return true, that feature is not added to the map.

Currently, the myFilter function contains only:

`return true;`

Since it always returns true, it will add each feature to the map. Modify the
code so it only adds features to the map if they have a collection day (not an
empty string).

## Task 4

Let's make something happen when a user clicks on a feature. Change the "Day of
Week" in the sidebar to show the day of the week of garbage removal. Make sure
to display the full name (display "Monday" instead of "MON").

We will write everything we want to happen on each feature inside of the
following block of code:

var eachFeature = function(feature, layer) {
  ...
});

Notice that inside of that block of code we have a second block of code:

layer.on('click', function (e) {
  ...
})

That part sets up a click event on each feature. Any code inside that second
block of code will happen each time a feature is clicked.

## Task 5

Create a legend for the map. You do not need to use Javascript. You can use HTML
and CSS to create legend boxes and give each a different color. Put a label next
to each box. Position the legend on top of the map (hint, you will need to use)
absolute positioning, which is the technique used to position the sidebar and
map on this page).

## Task 6 (Stretch Goal)

Use fitBounds (http://leafletjs.com/reference.html#map-fitbounds) to zoom in and
center the map on one particular feature. To find the bounds for a feature, use
e.target.getBounds() or this.getBounds() inside of the layer.on function.

## Task 7 (Stretch Goal)

Add a "Close" or "X" button to the top right of your sidebar. When when the
button is clicked, call a function closeResults that performs the opposite
processes as showResults, returning the user to the original state of the
application.

## Task 8 (Stretch Goal)

Use Underscore to perform analysis on this GeoJSON data: find out which day of
the week was the most common for garbage removal?

===================== */

var dataset = 'https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/geojson/philadelphia-garbage-collection-boundaries.geojson';

var myStyle = function(feature) {
  if (feature.properties.COLLDAY === "MON") {
    return {fillColor: '#f3ecbc'};
  }
  else if (feature.properties.COLLDAY === "TUE") {
    return {fillColor: '#f4b657'};
  }
  else if (feature.properties.COLLDAY === "WED") {
    return {fillColor: '#f1625d'};
  }
  else if (feature.properties.COLLDAY === "THU") {
    return {fillColor: '#8dbeb1'};
  }
  else {
    return {fillColor: '#5d4c52'};
  }
}; //task 2



var eachFeature = function(feature, layer) {
if (feature.properties.COLLDAY === "MON") {
  feature.properties.Collday = 'Monday' ;
}
if (feature.properties.COLLDAY === "TUE") {
  feature.properties.Collday = 'Tuesday' ;
}
if (feature.properties.COLLDAY === "WED") {
  feature.properties.Collday = 'Wednesday' ;
}
if (feature.properties.COLLDAY === "THU") {
  feature.properties.Collday = 'Thursday' ;
}
if (feature.properties.COLLDAY === "FRI") {
  feature.properties.Collday = 'Friday' ;
}
  layer.on('click', function (e) {
  $('.day-of-week').text(feature.properties.Collday);
    //task 4
    map.fitBounds(this.getBounds());
    //Task 6
    console.log(feature);
    showResults();
  });
};

var myFilter = function(feature) {
  if (feature.properties.COLLDAY !== " ") {
  return true;
  }
}; // task 3

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


var showResults = function() {
  /* =====================
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).hide() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  ===================== */
  $('#intro').hide();
  $('#results').show();
};

var closeResults = function() {
  $('#results').hide();
  $('#intro').show();
map.setView([40.000, -75.1090], 11);
};

$('#close').click(function(){
closeResults();
});
//task 7


// task 8
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
var num = [{day: 'Monday', n: 0}, {day: 'Tuesday', n: 0}, {day: 'Wednesday', n: 0}, {day: 'Thursday', n: 0}, {day: 'Friday', n: 0}];
_.each(parsedData.features, function(feature){
  if (feature.properties.COLLDAY === "MON") {
    num[0].n ++;
  }
  if (feature.properties.COLLDAY === "TUE") {
    num[1].n ++ ;
  }
  if (feature.properties.COLLDAY === "WED") {
    num[2].n ++ ;
  }
  if (feature.properties.COLLDAY === "THU") {
    num[3].n ++ ;
  }
  if (feature.properties.COLLDAY === "FRI") {
    num[4].n ++ ;
  }
});
console.log(num);
var max = _.max(num, function(num){ return num.n; });
console.log(max.day);
});
});


/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);
