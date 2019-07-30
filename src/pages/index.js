import React, { useState } from "react"
import { Link } from "gatsby"
import Button from "react-bootstrap/Button"
import ButtonToolBar from "react-bootstrap/ButtonToolbar"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import '@google/model-viewer';
import '@google/maps';
import Dumpster from "../components/dumpster";
import MapClient from "../components/mapClient";
import MapComponent from "../components/mapComponent"
import { async } from "q";

const IndexPage = () => {
  const [yards, setYards] = useState(10);
return (  
  <Layout>
    <SEO title="Home" />
    <h1>Hi Budget Dumpster</h1>
    <p>Welcome to your AR POC.</p>
    <p>Instructions</p>
    { <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      {/* <model-viewer src="src/models/container10.gltf" ar camera-controls alt="Model of Dumpster" background-color="#222" ios-src="src/models/container10.usdz" quick-look-browsers= "safari chrome"></model-viewer> */}
      <Dumpster modelId={yards}/>
    </div> }
    <div>
      <Link to="/PolygonPage">Polygon Page</Link>
    </div>
    <ButtonToolBar>
      <Button onClick={() => setYards(10)}>10 Yard</Button>
      <Button onClick={() => setYards(15)}>15 Yard</Button>
      <Button onClick={() => setYards(20)}>20 Yard</Button>
      <Button onClick={() => setYards(30)}>30 Yard</Button>
      <Button onClick={() => setYards(40)}>40 Yard</Button>
    </ButtonToolBar>
  </Layout>
)


}


export default IndexPage
