import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { GoogleMap, useLoadScript, StandaloneSearchBox, DrawingManager } from '@react-google-maps/api'
import {Spinner, Row, Col} from 'react-bootstrap'
import { navigate } from 'gatsby'

const libs = ['places', 'visualization', 'drawing', 'geometry']

const mapCenter = {lat: 34.02425, lng: -118.49300} 

const drawingManagerOptions = {
  drawingMode:'polygon',
  drawingControl: false,
  drawingControlOptions:{ drawingModes:['polygon'] },
  polygonOptions:{ draggable:true }
}

const Map = forwardRef((props, ref) => {
  
  const [center, setCenter] = useState(mapCenter)

  let maps
  let searchBox
  let all_overlays = []
  let polygonPath
  let checkedArea
  let mapRef
  let polygonBounds

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyABZ-W1LP5XHasJEF0z3NMzRkkX5uP4_xA",
    libraries: libs
  })


  const onPolygonComplete = (polygon) => {
    polygonBounds = polygon.getPath()
    let bounds = []
    for (let i = 0; i < polygonBounds.length; i++) {
      let point = {lat: polygonBounds.getAt(i).lat(), lng: polygonBounds.getAt(i).lng()}
      bounds.push(point)
    }
    polygonPath = bounds
    props.polygonPathData(polygonPath)
  }

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces()
    const bounds = new maps.LatLngBounds()
    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    })
    const nextCenter = places.map(place => (place.geometry.location))
    props.addressData(places[0].formatted_address)
    mapRef.panTo(nextCenter[0])
  }

  useImperativeHandle(ref, () => ({
    resetDrawing() {
        all_overlays.forEach(item => item.overlay.setMap(null))
        all_overlays = []
        checkedArea = 0
      },

    // should include logic for saving map return value here
    onClickDynamic() {
      var area = maps.geometry.spherical.computeArea(polygonBounds);
      checkedArea= area * 10.7639

      const dump_sizes = [10, 15, 20, 30, 40]
      const dump_areas = [105, 120, 165, 165, 165]

      const render_dump_areas = dump_areas.filter(area=> area <= checkedArea)
      const checkedSize = dump_sizes[render_dump_areas.length - 1]

      if (typeof localStorage !== `undefined`) {
      localStorage.setItem('drivewaySize',checkedSize)
      }
      navigate('/ar-viewer')
    }
  }))
  
  const RenderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that
    const onLoad = React.useCallback(
      function onLoad (mapRefs) {
        // do something with map Instance
        if (typeof window !== `undefined`) {
           maps = window.google.maps
           mapRef = mapRefs
        }
      }
    )

    return (
      <GoogleMap
        mapContainerStyle={{maxWidth: `100%`, height:'600px'}}
        zoom={23}
        center={center}
        onLoad={onLoad}
        options={{
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          tilt: 0,
          mapTypeId:'satellite'
        }}       

      >
<Row>
      <Col xl={9} lg={9} md={9} sm={9}>
      <StandaloneSearchBox onLoad={ref => searchBox=ref}  onPlacesChanged={onPlacesChanged}>
          <input
            type='text'
            placeholder='Search for your address'
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `320px`,
              height: `36px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `16px`,
              outline: `none`,
              textOverflow: `ellipses`,
              // position: 'absolute',
              // top: '10px',
              // left: '32px',
            }}
          />
        </StandaloneSearchBox>      
        </Col>

      <Col xl={3} lg={3} md={3} sm={3}>
      {props.children}
      </Col>
    </Row>
        

        <DrawingManager
          options={drawingManagerOptions}
          onLoad={drawingManager => console.log(drawingManager)}
          onPolygonComplete={onPolygonComplete}
          onPolylineComplete={polyline => console.log(polyline)}
          onOverlayComplete={overlay => all_overlays.push(overlay)}
        />
      </GoogleMap>
    )}

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? <RenderMap/> : (<Spinner animation="border" role="status"/>)
})

export default Map
