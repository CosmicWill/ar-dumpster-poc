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

const DynamicDumpsterPage = () => {
  const [yards, setYards] = useState(10);
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
    <h1>Hi Budget Dumpster</h1>
    <p>Welcome to your AR POC.</p>
    <p>Instructions</p>
    { <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      {/* <model-viewer src="src/models/container10.gltf" ar camera-controls alt="Model of Dumpster" background-color="#222" ios-src="src/models/container10.usdz" quick-look-browsers= "safari chrome"></model-viewer> */}
      <Dumpster modelId={yards}/>
    </div> }
    <div>
      <Link to="/">Reset</Link>
    </div>
    {renderButtonsArray()}
  </Layout>

)


}

export default DynamicDumpsterPage
