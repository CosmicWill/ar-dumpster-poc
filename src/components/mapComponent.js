/* eslint-disable no-undef */

import React from "react";
const { compose, withProps } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  Marker,
  GoogleMap,
} = require("react-google-maps");
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");
//const google = window.google;

const MapWithADrawingManager = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyABZ-W1LP5XHasJEF0z3NMzRkkX5uP4_xA&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `250px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={19}
    defaultCenter={{ lat: 34.024254, lng: -118.492986 }}
    defaultTilt = {0}
    defaultOptions={{
        disableDefaultUI: true,
        mapTypeId: 'satellite',//google.maps.MapTypeId.TERRAIN,
      }}
  >
   <Marker key = "default" position = {{ lat: 34.024254, lng: -118.492986 }} />
    
    <DrawingManager
      defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
      defaultOptions={{
        drawingControl: false,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.POLYGON,
          ],
        },
        circleOptions: {
          fillColor: `#ffff00`,
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: true,
          editable: true,
          zIndex: 1,
        },
      }}
    />
  </GoogleMap>
);

{/* <MapWithADrawingManager /> */}

export default MapWithADrawingManager