import React from 'react'
import { Element } from 'react-scroll'
import { Anchor, Box, Text } from 'grommet'
import { Twitter, Medium } from 'grommet-icons'

import Contact from './Contact'
import Section from './Section'
import { Heading1 } from './Theme'

const Footer = () => (
  <footer>
    <Section background="light-1">
      <Element name="contact">
        <Box pad="xsmall">
          <Box width="large">
            <Heading1>Say hi.</Heading1>
            <Contact />
          </Box>
          <Box>
            <Heading1>Or find me elsewhere.</Heading1>
            <Box direction="row">
              <Box pad="xxsmall">
                <Anchor
                  href="https://twitter.com/ushi_"
                  target="blank"
                  icon={<Twitter />}
                />
              </Box>
              <Box pad="xxsmall">
                <Anchor
                  href="https://medium.com/@yosukeushigome"
                  target="blank"
                  icon={<Medium />}
                />
              </Box>
            </Box>
          </Box>
          <Box pad={{ bottom: 'small' }}>
            <Text textAlign="end">
              ©{new Date().getFullYear()} Yosuke Ushigome
            </Text>
          </Box>
        </Box>
      </Element>
    </Section>
  </footer>
)

export default Footer
