import React, { useState } from 'react'
import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

const VideoWrapper = styled(Box)`
  width: 100%;
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
`

const VideoPlayer = ({ url, fluidPlaceholder }) => {
  const [videoReady, setVideoReady] = useState(false)
  const [videoError, setVideoError] = useState(false)
  return (
    <VideoWrapper background="light-2">
      {fluidPlaceholder && videoError && (
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
      {!videoError && (
        <ReactPlayer
          url={url}
          controls
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            background: 'black',
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 0.4s ease-out',
          }}
          onReady={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
        />
      )}
    </VideoWrapper>
  )
}

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  fluidPlaceholder: PropTypes.any,
}

export default VideoPlayer
