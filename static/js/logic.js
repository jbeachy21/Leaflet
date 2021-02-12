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
    var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'",
      maxZoom: 18,
      id: "outdoors-v11",
      accessToken: API_KEY
    });
  

    
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light": lightmap,
        "Satelite": satellitemap,
        "Dark": darkmap,
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
    layers: [lightmap, earthquakes]
    });
    map.flyTo([30.145127, -27.064836], 3)

   
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
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
        // var icon = new L.Icon({
        //     iconUrl: '',
        //     html: color
        //   });
          
        // console.log(`icon = ${icon}`);

        // console.log(`magnitude = ${Math.floor(magnitude)}`);
        // console.log(`color = ${color}`);
        
        var Quakepoint = L.circleMarker([lat, lon], {radius: magnitude * Math.PI,color:color}).bindPopup("<h3>Location: " + response.features[index].properties.place + "</h3><h3>Magnitude: " + magnitude + 
        "</h3><h3>Coordinates: " +`${lat},${lon}` + "</h3><h3>" + `${date}` + "</h3>");
        // document.getElementsByClassName('leaflet-marker-icon').style.backgroundColor = color;

        Quakepoints.push(Quakepoint);
         
    }
     
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(Quakepoints));
  }
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);



