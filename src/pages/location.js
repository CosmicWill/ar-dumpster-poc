import React, { useState, useRef, useCallback } from "react"
import { Link } from "gatsby"
import Button from "react-bootstrap/Button"
import ButtonToolBar from "react-bootstrap/ButtonToolbar"
import {Container , Row, Col} from 'react-bootstrap'

import Layout from "../components/layout"
import SEO from "../components/seo"
import '@google/model-viewer';
import Dumpster from "../components/dumpster";
import Map from "../components/maphook"

const IndexPage = () => {
  const [yards, setYards] = useState(10);
  const [address, setAddress] = useState();
  const [path, setPath] = useState();

  const mapRef = useRef();
  
  const polygonPathData = (path) => {
    console.log("path",path)
    setPath(path)
  }

  const addressData = (address) => {
    console.log(address)
    setAddress(address)
  }
  
  //Used Callback to make sure map is not reloaded on state change
  const MemoMap = useCallback(
  <Map ref={mapRef} polygonPathData={polygonPathData} addressData={addressData}>
    <ButtonToolBar>
      <Button variant="warning" style={{zIndex:1}} onClick={() => mapRef.current.resetDrawing()}>Reset</Button>
      <Button variant="success" style={{zIndex:1}} onClick={() => mapRef.current.onClickDynamic()}>Done</Button>
    </ButtonToolBar>
  </Map>
    
    , [])

return (
  <Layout>
    <SEO title="Home" />
    
    <Row>
      <h1>Let's figure out the best Dumpster for You!</h1>
    </Row>

    <Row>
      <Col xl={8} lg={8} md={8} sm={12}>
        <p>Outline the larger area in which you want the dumpster place (e.g. your driveway)</p>
      </Col>

      <Col xl={4} lg={4} md={4} sm={12}>
        <p>Address: {address}</p>
      </Col>
    </Row>

    <Row>
      <Col xl={12} lg={12} md={12} sm={12}>
        {MemoMap}
      </Col>
    </Row>
  </Layout>
)}

export default IndexPage
