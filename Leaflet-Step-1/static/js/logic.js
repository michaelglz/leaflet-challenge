// Creating map object
var map = L.map("map", {
  center: [37.0902, -95.7129],
  zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(map);

// If data.beta.nyc is down comment out this link
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function markerSize(mag) {
  return mag * 5;
};

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJSON(data.features, {
      pointToLayer: function(features, latlng) {
          return L.circleMarker(latlng, {radius: markerSize(features.properties.mag)});
      },

    style: function(features) {
      return {
        color: "black",
        fillColor: chooseColor(features.properties.mag),
        fillOpacity: 1,
        weight: .5
      }
    },

    onEachFeature: function (feature, layer) {
      layer.bindPopup(
          "<h4 style='text-align:center;'>" + new Date(feature.properties.updated) +
          "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.place + 
          "</h5> <hr> <h5 style='text-align:center;'>" + "Magnitude: " + feature.properties.mag + "</h5>");
  }

  }).addTo(map);
  createMap(map);
});

// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(mag) {
  switch (true) {
  case mag >= 5:
    return "red";
  case mag >= 4:
    return "darkorange";
  case mag >= 3:
    return "orange";
  case mag >= 2:
    return "gold";
  case mag >= 1:
    return "greenyellow";
  default:
    return "lime";
  }
};