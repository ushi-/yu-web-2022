import React from 'react'
import { Box } from 'grommet'

const Section = props => (
  <Box {...props}>
    <Box width="xlarge" alignSelf="center">
      {props.children}
    </Box>
  </Box>
)

export default Section
