import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

const VideoWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
`
const VideoPlayer = ({ url, fluidPlaceholder }) => (
  <VideoWrapper>
    {fluidPlaceholder && (
      <GatsbyImage
        image={fluidPlaceholder}
        style={{
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    )}
    <ReactPlayer
      url={url}
      controls
      width="100%"
      height="100%"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  </VideoWrapper>
)

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  fluidPlaceholder: PropTypes.any,
}

export default VideoPlayer
