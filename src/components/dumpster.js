import React from "react"
import { useStaticQuery, graphql } from "gatsby"

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
        android_model: allFile(filter: {relativePath: {regex: "/(container10.glb)/"}}) {
            edges {
                node {
                    id
                    publicURL
                }
            }
        }
        ios_model: allFile(filter: {relativePath: {regex: "/(container10.usdz)/"}}) {
            edges {
                node {
                    id
                    publicURL
                }
            }
        }
     }
    `)
    const android_dumpster = data.android_model.edges[0].node.publicURL;
    const ios_dumpster = data.ios_model.edges[0].node.publicURL;

   return  <model-viewer src={android_dumpster} ar camera-controls alt="Model of Dumpster" background-color="#222" ios-src={ios_dumpster} quick-look-browsers= "safari chrome"/>
}

export default Dumpster
