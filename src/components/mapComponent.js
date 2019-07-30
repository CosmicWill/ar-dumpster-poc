/* eslint-disable no-undef */

import React from "react";
import { Polygon } from "react-google-maps";
import Button from "react-bootstrap/Button";
import ButtonToolBar from "react-bootstrap/ButtonToolbar";
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
    containerElement: <div style={{ height: `200px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <div>
  <GoogleMap
    defaultZoom={19}
    defaultCenter={{ lat: 34.444937, lng: -119.8553888 }}
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

      }}
      onPolygonComplete={(value) => console.log(getPaths(value))}  


      
    />
  </GoogleMap>
  <ButtonToolBar>
  <Button onClick={checkModels}>Done</Button>
  <Button onClick={resetDrawing}>Reset</Button>
  </ButtonToolBar>
  </div>
);

function getPaths(polygon){
  var area = google.maps.geometry.spherical.computeArea(polygon.getPath());
  var coordinates = (polygon.getPath().getArray());
  var convertedArea = area * 10.7639;
  console.log(convertedArea);
}

function checkModels(){
  console.log("done")
}

function resetDrawing(){
  console.log("reset")
//  DrawingManager.resetDrawing
}

{/* <MapWithADrawingManager /> */}

export default MapWithADrawingManager