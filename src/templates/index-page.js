import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Box } from 'grommet'

import Content, { HTMLContent } from '../components/Content'
import FluidHeadline from '../components/FluidHeadline'
import Layout from '../components/Layout'
import ProjectIndex from '../components/ProjectIndex'
import Section from '../components/Section'

export const IndexPageTemplate = ({
  content,
  contentAst,
  contentComponent,
  edges,
  headline
}) => {
  const PageContent = contentComponent || Content
  const projects = edges
    ? edges.map((edge, index) => (
        <ProjectIndex key={edge.node.fields.slug} index={index} node={edge.node} />
      ))
    : null
  return (
    <Section>
      <Box pad="xsmall">
        <FluidHeadline headline={headline} />
        <PageContent
          className="content"
          content={content}
          contentAst={contentAst}
        />
      </Box>
      {projects}
    </Section>
  )
}

IndexPageTemplate.propTypes = {
  content: PropTypes.string,
  contentAst: PropTypes.object,
  contentComponent: PropTypes.func,
  edges: PropTypes.array,
  headline: PropTypes.string
}

const IndexPage = ({ data, location }) => {
  const { frontmatter, htmlAst } = data.markdownRemark
  const { edges } = data.allMarkdownRemark
  return (
    <Layout location={location}>
      <IndexPageTemplate
        contentAst={htmlAst}
        contentComponent={HTMLContent}
        edges={edges}
        headline={frontmatter.headline}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default IndexPage

export const pageQuery = graphql`query IndexPageTemplate {
  markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
    htmlAst
    frontmatter {
      title
      headline
    }
  }
  allMarkdownRemark(
    limit: 2000
    filter: {frontmatter: {templateKey: {eq: "project"}}}
    sort: {order: DESC, fields: [frontmatter___order]}
  ) {
    edges {
      node {
        frontmatter {
          title
          client
          indexHeadline
          indexOrientation
          indexJustification
          indexImage {
            childImageSharp {
              gatsbyImageData(
                width: 768
                quality: 90
                placeholder: TRACED_SVG
                layout: CONSTRAINED
              )
            }
          }
          externalLink
        }
        fields {
          slug
        }
      }
    }
  }
}
`
