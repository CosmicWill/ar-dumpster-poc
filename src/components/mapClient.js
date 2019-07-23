import React from "react"

 const MapClient = require('@google/maps').createClient({
     key: 'AIzaSyABZ-W1LP5XHasJEF0z3NMzRkkX5uP4_xA',
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