import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"

function Map() {
    return (
        <GoogleMap
        defaultZoom={19}
        defaultCenter={{ lat: 34.024254, lng: -118.492986 }}
      >

      <Marker key = "default" position = {{ lat: 34.024254, lng: -118.492986 }} />
      >

        <Polyline
            path= {[{lat: 34.0245, lng: -118.4928}, {lat: 34.024, lng: -118.493 }] }
            geodesic={true}
            options={{
            strokeColor: "#ff2527",
            strokeOpacity: 0.75,
            strokeWeight: 2,

            }}
            />
        </GoogleMap>
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map)); 

  
export default function MapComponent() {
    return (
        <div>
            <WrappedMap
            googleMapURL = {' https://maps.googleapis.com/maps/api/js?key=AIzaSyABZ-W1LP5XHasJEF0z3NMzRkkX5uP4_xA'}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `200px` }} />}
             mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}