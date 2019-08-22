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
    <SEO title="Polygon Drawing" />
    <h1>Let's figure out the best Dumpster for You!</h1>
    
    <div id = "map" style={{ height: 300, width: 300, marginBottom: `1.75rem` }}>
      Outline the larger area in which you want the dumpster place (e.g. your driveway)
      <MapComponent/>
      
    </div> 
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyABZ-W1LP5XHasJEF0z3NMzRkkX5uP4_xA"></script>
    <Link className='linkMargin' to="/">Go back to the homepage</Link> 
  </Layout>
)

export default SecondPage
