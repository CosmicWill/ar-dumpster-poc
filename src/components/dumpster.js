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

const Dumpster = (props) => {
  const data = useStaticQuery(graphql`
    query {
        android_model_10: allFile(filter: {relativePath: {regex: "/(containerModelx10.glb)/"}}) {
            edges {
                node {
                    id
                    publicURL
                }
            }
        }
        ios_model_10: allFile(filter: {relativePath: {regex: "/(containerExpanded.usdz)/"}}) {
            edges {
                node {
                    id
                    publicURL
                }
            }
        }
        android_model_15: allFile(filter: {relativePath: {regex: "/(containerModelx15.glb)/"}}) {
            edges {
                node {
                    id
                    publicURL
                }
            }
        }
        ios_model_15: allFile(filter: {relativePath: {regex: "/(containerUSDZx15.usdz)/"}}) {
            edges {
                node {
                    id
                    publicURL
                }
            }
        }
        android_model_20: allFile(filter: {relativePath: {regex: "/(containerModelx20.glb)/"}}) {
            edges {
                node {
                    id
                    publicURL
                }
            }
        }
        ios_model_20: allFile(filter: {relativePath: {regex: "/(containerUSDZx20.usdz)/"}}) {
            edges {
                node {
                    id
                    publicURL
                }
            }
        }
        android_model_30: allFile(filter: {relativePath: {regex: "/(containerModelx30.glb)/"}}) {
            edges {
                node {
                    id
                    publicURL
                }
            }
        }
        ios_model_30: allFile(filter: {relativePath: {regex: "/(containerUSDZx30.usdz)/"}}) {
            edges {
                node {
                    id
                    publicURL
                }
            }
        }
        android_model_40: allFile(filter: {relativePath: {regex: "/(containerModelx40.glb)/"}}) {
            edges {
                node {
                    id
                    publicURL
                }
            }
        }
        ios_model_40: allFile(filter: {relativePath: {regex: "/(containerUSDZx40.usdz)/"}}) {
            edges {
                node {
                    id
                    publicURL
                }
            }
        }
     }
    `)

    const android_model_dict = {
        10:data.android_model_10.edges[0].node.publicURL,
        15:data.android_model_15.edges[0].node.publicURL,
        20:data.android_model_20.edges[0].node.publicURL,
        30:data.android_model_30.edges[0].node.publicURL,
        40:data.android_model_40.edges[0].node.publicURL,     
    }

    const ios_model_dict = {
        10:data.ios_model_10.edges[0].node.publicURL,
        15:data.ios_model_15.edges[0].node.publicURL,
        20:data.ios_model_20.edges[0].node.publicURL,
        30:data.ios_model_30.edges[0].node.publicURL,
        40:data.ios_model_40.edges[0].node.publicURL,
    }

   return  <model-viewer style={{height: '500px', width: '100%'}} src={android_model_dict[props.modelId]} ar camera-controls alt="Model of Dumpster" background-color="#222" ios-src={ios_model_dict[props.modelId]} quick-look-browsers= "safari chrome"/>
}

export default Dumpster
