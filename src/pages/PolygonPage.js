import React from "react"
import { Link } from "gatsby"
import '@google/model-viewer';
import '@google/maps';
import Dumpster from "../components/dumpster";
import MapClient from "../components/mapClient";
import MapComponent from "../components/mapComponent"
import { async } from "q";
import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
    <div id = "map" style={{ height: 300, width: 300, marginBottom: `1.45rem` }}>
      {/* <model-viewer src="src/models/container10.gltf" ar camera-controls alt="Model of Dumpster" background-color="#222" ios-src="src/models/container10.usdz" quick-look-browsers= "safari chrome"></model-viewer> */}
      {/* <Dumpster modelId={yards}/> */}
      Outline the larger area in which you want the dumpster place (e.g. your driveway)
      <MapComponent/>
 
      {/* <IMG src = "../images/gatsby-icon.png" alt = "testing image" /> */}
    </div> 
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyABZ-W1LP5XHasJEF0z3NMzRkkX5uP4_xA"></script>
  </Layout>
)

export default SecondPage
