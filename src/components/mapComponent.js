/* eslint-disable no-undef */
import React from "react";
import { Polygon } from "react-google-maps";
import Button from "react-bootstrap/Button";
import ButtonToolBar from "react-bootstrap/ButtonToolbar";
import { navigate } from 'gatsby'

import { compose, withProps, lifecycle } from "recompose"

import {   
  withScriptjs,
  withGoogleMap,
  Marker,
  GoogleMap,
 } from "react-google-maps";


const _ = require("lodash");

const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

// should include logic for saving map return value here
const onClickDynamic = () => {
  // Logic for returning mapped area
  console.log(checkedArea)
  const dump_sizes = [10, 15, 20, 30, 40];
  const dump_areas = [200, 300, 500, 600, 650];
  const render_dump_areas = dump_areas.filter(area=> area <= checkedArea);
 // const sizeNumber = render_dump_areas.length - 1

  const checkedSize = dump_sizes[render_dump_areas.length - 1]
  console.log(checkedSize)

  if (typeof localStorage !== `undefined`) {
  localStorage.setItem('drivewaySize',checkedSize)
  }
  navigate('/DynamicDumpsterPage')
}

const MapWithADrawingManager = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyABZ-W1LP5XHasJEF0z3NMzRkkX5uP4_xA&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
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
    defaultZoom={20}
    defaultTilt = {0}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    defaultOptions={{
        //disableDefaultUI: true,
        mapTypeId: 'satellite',
      }}
  >
   <Marker key="default" position={{ lat: 34.024254, lng: -118.492986 }} />
    
    <DrawingManager
      defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.POLYGON,
          ],
        },
      }}
      
      onPolygonComplete={(value) => console.log(getPaths(value))}  
      onOverlayComplete={(value) => all_overlays.push(value)}
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

var checkedArea
var all_overlays = []

function getPaths(polygon){
  var area = google.maps.geometry.spherical.computeArea(polygon.getPath());
  var coordinates = (polygon.getPath().getArray());
  var convertedArea = area * 10.7639;
  checkedArea = convertedArea
 // localStorage.setItem('drivewayArea', convertedArea)
 // console.log(checkedArea);
}

function resetDrawing(){
  for (var i=0; i < all_overlays.length; i++)
  {
    all_overlays[i].overlay.setMap(null);
  }

  all_overlays = []
  checkedArea = 0
}

export default MapWithADrawingManager