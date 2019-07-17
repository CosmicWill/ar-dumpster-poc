import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { render } from "lit-html";

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Dumpster = () => {
  const data = useStaticQuery(graphql`
    query {
      model: allFile(relativePath: { eq: "container10.gltf" }) {
          edges{
              node {
                  id
                  publicURL
              }
          }
      }
    }
  `)
  
  return  <model-viewer src={data.model.edges[0].node.publicURL} ar camera-controls alt="Model of Dumpster" background-color="#222" ios-src="/src/models/container10.usdz" quick-look-browsers= "safari chrome"/>
}

export default Dumpster
