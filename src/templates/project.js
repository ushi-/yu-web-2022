import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Box, ResponsiveContext, Text } from 'grommet'
import styled from 'styled-components'
import isRelativeUrl from 'is-relative-url'

import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'
import ProjectIndex from '../components/ProjectIndex'
import Section from '../components/Section'
import useSiteMetadata from '../components/SiteMetadata'
import { Heading1, Heading4 } from '../components/Theme'
import VideoPlayer from '../components/VideoPlayer'

const Headline = styled(Heading1)`
  margin-block-start: 0.25em;
  margin-block-end: 0.25em;
`

const Title = styled(Heading4)`
  margin-block-end: 0;
  line-height: 1.4;
`

const ProjectTemplate = ({
  client,
  content,
  contentAst,
  contentComponent,
  headline,
  helmet,
  heroImage,
  heroVideoUrl,
  relatedProjectEdges,
  title,
  year,
}) => (
  <ResponsiveContext.Consumer>
    {(size) => {
      const PostContent = contentComponent || Content
      const mobile = size === 'small'
      const relatedProjects = relatedProjectEdges
        ? relatedProjectEdges.map((edge, index) => (
            <ProjectIndex
              key={edge.node.fields.slug}
              index={index}
              node={edge.node}
              verticalPad="medium"
            />
          ))
        : null
      return (
        <Section>
          {helmet || ''}
          <Box
            pad={{
              left: 'xsmall',
              right: 'xsmall',
              top: mobile ? 'large' : 'medium',
              bottom: 'xsmall',
            }}
          >
            <Box pad={{ vertical: 'xsmall' }}>
              {heroVideoUrl !== '' ? (
                <VideoPlayer
                  url={heroVideoUrl}
                  fluidPlaceholder={heroImage.childImageSharp.gatsbyImageData}
                />
              ) : (
                <GatsbyImage
                  image={heroImage.childImageSharp.gatsbyImageData}
                />
              )}
            </Box>
            <Box direction="row" justify="center">
              <Box basis="large" direction="row" align="end" gap="small">
                <Title>{title}</Title>
                <Text>{client !== '' ? `${client}, ${year}` : year}</Text>
              </Box>
            </Box>
            <Box direction="row" wrap justify="center">
              <Box basis="large">
                <Headline>{headline}</Headline>
              </Box>
              <Box basis="small" />
            </Box>
            <Box direction="row" justify="center">
              <Box basis="large">
                <PostContent content={content} contentAst={contentAst} />
              </Box>
            </Box>
            <Box direction="row" justify="center" pad={{ top: 'small' }}>
              <Box basis="large">
                <Heading1>Related projects:</Heading1>
              </Box>
            </Box>
          </Box>
          {relatedProjects}
        </Section>
      )
    }}
  </ResponsiveContext.Consumer>
)

ProjectTemplate.propTypes = {
  client: PropTypes.string,
  content: PropTypes.node,
  contentAst: PropTypes.object,
  contentComponent: PropTypes.func,
  headline: PropTypes.string,
  helmet: PropTypes.object,
  heroImage: PropTypes.object,
  heroVideoUrl: PropTypes.string,
  relatedProjectEdges: PropTypes.array,
  title: PropTypes.string,
  year: PropTypes.string,
}

const Project = ({ data, location }) => {
  const { title: siteTitle, siteUrl } = useSiteMetadata()
  const { markdownRemark: post } = data
  const {
    client,
    heroImage,
    heroVideoUrl,
    longHeadline,
    relatedProjects,
    title,
    year,
  } = post.frontmatter
  const { edges } = data.allMarkdownRemark
  const relatedProjectEdges = edges.filter((edge) =>
    relatedProjects.includes(edge.node.frontmatter.title)
  )
  const ogTitle = `${title} | ${siteTitle}`
  const heroImageUrl =
    heroImage.childImageSharp.gatsbyImageData.images.fallback.src
  const ogImageUrl = isRelativeUrl(heroImageUrl)
    ? `${siteUrl}${heroImageUrl}`
    : heroImageUrl
  return (
    <Layout location={location}>
      <ProjectTemplate
        client={client}
        contentAst={post.htmlAst}
        contentComponent={HTMLContent}
        headline={longHeadline}
        helmet={
          <Helmet>
            <title>{ogTitle}</title>
            <meta name="description" content={longHeadline} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={longHeadline} />
            <meta property="og:image" content={ogImageUrl} />
          </Helmet>
        }
        heroImage={heroImage}
        heroVideoUrl={heroVideoUrl}
        relatedProjectEdges={relatedProjectEdges}
        title={title}
        year={year}
      />
    </Layout>
  )
}

Project.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
    allMarkdownRemark: PropTypes.object,
  }),
}

export default Project

export const pageQuery = graphql`
  query ProjectByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      htmlAst
      frontmatter {
        title
        year
        client
        longHeadline
        heroImage {
          childImageSharp {
            gatsbyImageData(
              quality: 90
              placeholder: TRACED_SVG
              layout: FULL_WIDTH
            )
          }
        }
        heroVideoUrl
        relatedProjects
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { templateKey: { eq: "project" } } }
      sort: { order: DESC, fields: [frontmatter___order] }
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
