function createMap(earthquakes) {
    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });

    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'",
      maxZoom: 18,
      id: "satellite-v9",
      accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });

    var satellitestreetsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'",
      maxZoom: 18,
      id: "satellite-streets-v11",
      accessToken: API_KEY
    });
    
    var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'",
      maxZoom: 18,
      id: "outdoors-v11",
      accessToken: API_KEY
    });

   
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Dark": darkmap,
        "Light": lightmap,
        "Satelite": satellitemap,
        "Satellite Streets": satellitestreetsmap,
        "Outdoors": outdoorsmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Earthquakes": earthquakes
    };
 
    // Create the map object with options
    var map = L.map("map", {
      center: [-14.599413, -28.673147],
      zoom: 9,
    //   layers: [lightmap, earthquakes]
    layers: [darkmap, earthquakes]
    });
    map.flyTo([30.145127, -27.064836], 3)

   
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);


    var legend = L.control({position:'bottomright'});

    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        return div;
      };
      // Add the info legend to the map
      legend.addTo(map);
     

      createLegend();
}

function createLegend() { 
    document.querySelector(".legend").innerHTML = [
      "<p style='background-color:#00FF7F'>Lime green: -10 to 10" + "</p>",
      "<p style='background-color:#ADFF2F'>Green yellow: 10 to 30" + "</p>",
      "<p style='background-color:#FFD700'>Gold: 30 to 50" +  "</p>",
      "<p style='background-color:#FFA500'>Orange: 50 to 70" + "</p>",
      "<p style='background-color:#FF8C00'>Dark Orange: 70 to 90"  + "</p>",
      "<p style='background-color:#FF0000'>Red: 90 and up"+ "</p>"
    ].join("");
    // var legend = document.getElementsByClassName("legend").style.backgroundColor = "#808080";
    // console.log("legend =" + legend)
    // legend.style.backgroundColor = "#808080";
  }

  function createMarkers(response) {
  
    var Quakepoints = [];

    var colorScale = ["#00FF7F","#ADFF2F","#ADFF2F","#FFD700","#FFD700","#FFA500","#FFA500","#FF8C00","#FF8C00","#FF0000"];

    for (var index = 0; index < response.features.length; index++) {
         
        var lon = response.features[index].geometry.coordinates[0];
        var lat = response.features[index].geometry.coordinates[1];
        var magnitude = response.features[index].properties.mag;
        if (magnitude < 0) magnitude = 0;
        var color = colorScale[Math.floor(magnitude)];
        var date = new Date(1000 * response.features[index].properties.time);
         
        
        var Quakepoint = L.circleMarker([lat, lon], {radius: magnitude * Math.PI,color:color}).bindPopup("<h3>Location: " + response.features[index].properties.place + "</h3><h3>Magnitude: " + magnitude + 
        "</h3><h3>Coordinates: " +`${lat}, ${lon}` + "</h3><h3>" + `Time: ${date}` + "</h3>");
         

        Quakepoints.push(Quakepoint);
         
    }
     
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(Quakepoints));
  }
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);



