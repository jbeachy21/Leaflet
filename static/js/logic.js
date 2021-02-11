// function createMap(earthquakes) {
function createMap(earthquakes) {
    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Earthquakes": earthquakes
    };
    // console.log(`Earthquakes Keys = ${Object.keys(earthquakes)}`);
    // console.log(`Earthquakes Values = ${Object.values(earthquakes)}`);
    // console.log(`Earthquakes Entries = ${Object.entries(earthquakes)}`);
    // console.log(`Earthquakes = ${earthquakes._latlng}`);
    // for (const item in earthquakes) console.log(Object.keys(item));
    // Object.entries(earthquakes).map(item => {console.log(item)})
    // Object.entries(earthquakes).forEach(item => console.log(item))
    // for (const item of Object.entries(earthquakes)) console.log(item[1]._latlng)
     
    
    // Create the map object with options
    var map = L.map("map", {
      center: [37.7749, -122.4194],
      zoom: 9,
    //   layers: [lightmap, earthquakes]
    layers: [lightmap, earthquakes]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }

  function createMarkers(response) {

    
    // var epicenters = response.features[0].geometry.coordinates[0];
    // console.log(response.features.length);
    
  
    // Initialize an array to hold bike markers
    var Quakepoints = [];
  
    // Loop through the stations array
    for (var index = 0; index < response.features.length; index++) {
        // var epicenter = (epicenters.features[index].geometry.coordinates[0],epicenters.features[index].geometry.coordinates[1]);
        var lon = response.features[index].geometry.coordinates[0];
        var lat = response.features[index].geometry.coordinates[1];
        // console.log(`Lat = ${lat} and lon = ${lon}`);
        // For each station, create a marker and bind a popup with the station's name
        var Quakepoint = L.marker([lat, lon])
        .bindPopup("<h3>Location: " + response.features[index].properties.place + "</h3><h3>Magnitude: " + response.features[index].properties.mag + 
        "</h3><h3>Coordinates: " +`${lat},${lon}` + "</h3>");
        // console.log(`Quakepoint = ${Quakepoint}`);
        // Add the marker to the bikeMarkers array
        // console.log(`Quakepoint = ${Quakepoint[index]}`);
        Quakepoints.push(Quakepoint);
        // for (const item of Object.entries(Quakepoint)) console.log(item)
        // console.log(`Quakespoints = ${Object.keys(Quakepoints)}`);
    }
    // for (const item of Object.entries(Quakepoint)) console.log(item)
    
     
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(Quakepoints));
  }
  
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);



 