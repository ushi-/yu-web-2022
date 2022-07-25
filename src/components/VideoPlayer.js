import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
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
      <Img
        fluid={fluidPlaceholder}
        style={{
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
    )}
    <ReactPlayer
      url={url}
      width="100%"
      height="100%"
      style={{
        position: 'absolute',
        top: 0,
        left: 0
      }}
    />
  </VideoWrapper>
)

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  fluidPlaceholder: PropTypes.any
}

export default VideoPlayer
