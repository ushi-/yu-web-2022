import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Box } from 'grommet'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { Heading1 } from '../components/Theme'
import Section from '../components/Section'

export const AboutPageTemplate = ({
  headline,
  content,
  contentAst,
  contentComponent
}) => {
  const PageContent = contentComponent || Content
  return (
    <Section>
      <Box pad="xsmall">
        <Heading1>{headline}</Heading1>
        <PageContent
          className="content"
          content={content}
          contentAst={contentAst}
        />
      </Box>
    </Section>
  )
}

AboutPageTemplate.propTypes = {
  headline: PropTypes.string,
  content: PropTypes.string,
  contentAst: PropTypes.object,
  contentComponent: PropTypes.func
}

const AboutPage = ({ data, location }) => {
  const { markdownRemark: post } = data

  return (
    <Layout location={location}>
      <AboutPageTemplate
        headline={post.frontmatter.headline}
        contentAst={post.htmlAst}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      htmlAst
      frontmatter {
        headline
      }
    }
  }
`
