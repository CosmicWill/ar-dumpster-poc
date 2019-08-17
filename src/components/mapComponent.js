/* eslint-disable no-undef */
import React from "react";
import { Polygon } from "react-google-maps";
import Button from "react-bootstrap/Button";
import ButtonToolBar from "react-bootstrap/ButtonToolbar";
import { navigate } from '@reach/router'

const { compose, withProps, lifecycle } = require("recompose");
const _ = require("lodash");
const {
  withScriptjs,
  withGoogleMap,
  Marker,
  GoogleMap,
} = require("react-google-maps");

const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
//const google = window.google;

// should include logic for saving map return value here
const onClickDynamic = () => {
  navigate('/DynamicDumpsterPage')
}

const MapWithADrawingManager = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyABZ-W1LP5XHasJEF0z3NMzRkkX5uP4_xA&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `200px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 34.02425, lng: -118.49300
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <div>
  <div>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={19}
    //defaultCenter={{ lat: 34.444937, lng: -119.8553888 }}
    defaultTilt = {0}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
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
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
  </GoogleMap>
  </div>
  
    <ButtonToolBar>
    <Button className='mapButton' onClick={onClickDynamic}>Done</Button>
    <Button className='mapButton' onClick={resetDrawing}>Reset</Button>
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