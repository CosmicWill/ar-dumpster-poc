import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import '@google/model-viewer';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <model-viewer src="https://poly.googleapis.com/downloads/fp/1563010914490043/5vbJ5vildOq/7vBfIqvpuoG/model.gltf" ar camera-controls alt="A 3D model of an astronaut" background-color="#222" ></model-viewer>

    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
