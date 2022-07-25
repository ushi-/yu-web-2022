import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Anchor, Box, ResponsiveContext, Text } from 'grommet'
import Img from 'gatsby-image'
import styled from 'styled-components'
// import Fade from 'react-reveal/Fade'

import { Heading2 } from '../components/Theme'

const TextLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  :visited {
    color: inherit;
  }
  :hover {
    color: #666;
  }
  transition: color 0.2s ease-out;
`

const TextAnchor = styled(Anchor)`
  text-decoration: none;
  color: inherit;
  :visited {
    color: inherit;
  }
  :hover {
    color: #666;
  }
  transition: color 0.2s ease-out;
`

const ImageLink = styled(Link)`
  :hover {
    transform: scale(1.05);
  }
  transition: 0.5s cubic-bezier(0.8, 0.2, 0.2, 1);
`

const ImageAnchor = styled(Anchor)`
  :hover {
    opacity: 1;
    transform: scale(1.05);
  }
  transition: 0.5s cubic-bezier(0.8, 0.2, 0.2, 1);
`

const Headline = styled(Heading2)`
  margin-block-start: 0.5em;
  margin-block-end: 0.2em;
`

const ProjectIndex = ({ index, node, verticalPad }) => (
  <ResponsiveContext.Consumer>
    {(size) => {
      const mobile = size === 'small'
      const { slug } = node.fields
      const {
        title,
        client,
        indexHeadline,
        indexOrientation,
        indexJustification,
        indexImage,
        externalLink,
      } = node.frontmatter
      const boxProps = {
        landscape: {
          imageBasis: 'large',
          textBasis: 'large',
          textPad: 'none',
        },
        portrait: {
          imageBasis: '576px',
          textBasis: '180px',
          textPad: {
            left: 'small',
          },
        },
        square: {
          imageBasis: 'medium',
          textBasis: 'medium',
          textPad: {
            left: 'small',
          },
        },
      }
      const { imageBasis, textBasis, textPad } =
        boxProps[mobile ? 'landscape' : indexOrientation]
      const justify = {
        left: 'start',
        center: 'center',
        right: 'end',
      }[indexJustification]
      const ImageLinkComponent = externalLink === '' ? ImageLink : ImageAnchor
      const TextLinkComponent = externalLink === '' ? TextLink : TextAnchor
      const pad = {
        horizontal: 'xsmall',
        top: index === 0 ? 'small' : verticalPad,
        bottom: verticalPad,
      }
      return (
        <Box
          key={slug}
          pad={pad}
          justify={justify}
          align="end"
          direction="row"
          wrap
        >
          <Box basis={imageBasis} flex="shrink" overflow="hidden">
            <ImageLinkComponent to={slug} href={externalLink} target="blank">
              <Img fluid={indexImage.childImageSharp.fluid} />
            </ImageLinkComponent>
          </Box>
          <Box basis={textBasis} flex="shrink" pad={textPad}>
            {/* <Fade bottom distance="1em" delay={200} duration={400}> */}
            <TextLinkComponent to={slug} href={externalLink} target="blank">
              <Headline>{`${indexHeadline}${
                externalLink !== '' ? ' ↗' : ''
              }`}</Headline>
              <Text>
                {client !== null && client !== ''
                  ? `${title} / ${client}`
                  : title}
              </Text>
            </TextLinkComponent>
            {/* </Fade> */}
          </Box>
        </Box>
      )
    }}
  </ResponsiveContext.Consumer>
)

ProjectIndex.propTypes = {
  index: PropTypes.number.isRequired,
  node: PropTypes.object.isRequired,
  verticalPad: PropTypes.string,
}

ProjectIndex.defaultProps = {
  verticalPad: 'large',
}

export default ProjectIndex
