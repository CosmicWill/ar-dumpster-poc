import React, { useState } from "react"
import { Link } from "gatsby"
import Button from "react-bootstrap/Button"
import ButtonToolBar from "react-bootstrap/ButtonToolbar"

import {Row, Col} from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import '@google/model-viewer';
import '@google/maps';
import Dumpster from "../components/dumpster";


const ARDumpsterPage = () => {
  const [yards, setYards] = useState(10)

  let local_d_size
  if (typeof localStorage !== `undefined`) {
    local_d_size = parseInt(localStorage.getItem('drivewaySize'), 10);
  }

const renderButtonsArray = () => {
  const dump_sizes = [10, 15, 20, 30, 40];
  const render_dump_sizes = dump_sizes.filter(size=> size <= local_d_size);
  return (
    <ButtonToolBar>
      {render_dump_sizes.map((value, index) => {
        return <Button key={index} onClick={() => setYards(value)}>{value} Yard</Button>
      })}
    </ButtonToolBar>
  )
}

return (
  <Layout>
    <SEO title="Home" />
    
    <Row>
      <h1>Visualize Your Dumpster Dimensions with Augmented Reality</h1>
    </Row>
    <Row>
      <Col sm={12}> <p style={{fontSize:18}}> <b>Go to the area</b> for your dumpster and select the dumpster size you want and then follow the instructions based on your OS:</p> </Col>
    </Row>
    <Row>

      <Col xl={6} lg={6} md={12} sm={12}> 
      <Row>
        <Col sm={12}> 
              <Dumpster modelId={yards}/>
        </Col>
        <Col sm={12}> 
          {renderButtonsArray()}
        </Col>
      </Row>

    </Col>

    <Col xl={6} lg={6} md={12} sm={12}> 
    <Row>
      <Col sm={12}> <h4>iPhone/iOS:</h4></Col>      
      <Col sm={12}> <p>1. Click on the icon in the bottom right to enter AR</p></Col>      
      <Col sm={12}> <p>2. Click “AR”</p> </Col>
      <Col sm={12}> <p>3. Aim your phone camera at the space for the dumpster until the dumpster model appears</p></Col>
      <Col sm={12}> <p>4. You can click on the dumpster to move or rotate it where you want it to be placed</p></Col>
      <Col sm={12}> <p>5. Take a screenshot and upload it to the page</p></Col>
    </Row>

    <Row>
      <Col sm={12}> <h4>Android (ARcore Enabled):</h4></Col>      
      <Col sm={12}> <p>1. Click on the icon in the bottom right to enter AR</p></Col>      
      <Col sm={12}> <p>2. Click “View in your space” </p> </Col>
      <Col sm={12}> <p>3. Click “Give Access” to activate AR</p></Col>
      <Col sm={12}> <p>4. Aim your phone camera at the space for the dumpster until the dumpster model appears</p></Col>
      <Col sm={12}> <p>5. You can click on the dumpster to move or rotate it where you want it to be placed</p></Col>
      <Col sm={12}> <p>6. Take a screenshot and upload it to the page</p></Col>
    </Row>
    </Col>

    </Row>

    {/* <div>
      <Link to="/">Reset</Link>
    </div> */}

    
  </Layout>
)}

export default ARDumpsterPage
