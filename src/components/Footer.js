import React from 'react'
import { Box, Text } from 'grommet'

import Section from './Section'

const Footer = () => (
  <footer>
    <Section>
      <Box pad={{ bottom: 'small' }}>
        <Text textAlign="end">©{new Date().getFullYear()} Yosuke Ushigome</Text>
      </Box>
    </Section>
  </footer>
)

export default Footer
