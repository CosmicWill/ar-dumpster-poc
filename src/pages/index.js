import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import '@google/model-viewer';
import Dumpster from "../components/dumpster";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      {/* <model-viewer src="src/models/container10.gltf" ar camera-controls alt="Model of Dumpster" background-color="#222" ios-src="src/models/container10.usdz" quick-look-browsers= "safari chrome"></model-viewer> */}
      <Dumpster/>
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
