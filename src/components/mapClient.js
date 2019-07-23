import React from "react"

 const MapClient = require('@google/maps').createClient({
     key: 'YOUR_API_KEY',
     Promise: Promise,

   });

  
   MapClient.geocode({
     address: '1600 Amphitheatre Parkway, Mountain View, CA'
   }, function(err, response) {
     if (!err) {
       console.log(response.json.results);
       return MapClient
     }
    });




export default MapClient