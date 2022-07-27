import React from 'react'
import PropTypes from 'prop-types'
import { Anchor, Box } from 'grommet'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import { Heading1, Heading3 } from '../components/Theme'
import Section from '../components/Section'

const NotFoundPage = ({ data }) => {
  const pages = data.allMarkdownRemark.edges.map(edge => (
    <li key={edge.node.fields.slug}>
      <Link to={edge.node.fields.slug}>
        <Anchor>{edge.node.frontmatter.title}</Anchor>
      </Link>
    </li>
  ))
  return (
    <Layout location={{ pathname: '/404' }}>
      <Section>
        <Box pad="xsmall">
          <Heading1>NOT FOUND.</Heading1>
          <Heading3>
            You just hit a route that doesn&#39;t exist... the sadness. Here is the list of places you can go from here.
          </Heading3>
          <ul>{pages}</ul>
        </Box>
      </Section>
    </Layout>
  )
}

NotFoundPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default NotFoundPage

export const notFoundQuery = graphql`
  query notFoundPageTemplate {
    allMarkdownRemark(
      limit: 2000
      sort: { order: ASC, fields: [fields___slug] }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
