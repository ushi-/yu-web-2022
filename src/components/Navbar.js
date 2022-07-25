import React from 'react'
import { Box, Layer, ResponsiveContext } from 'grommet'
import styled from 'styled-components'

import Section from './Section'
import Hamburger from './Hamburger'
import Menu from './Menu'

const Navbar = ({ className, location }) => {
  const [menuVisible, setMenuVisible] = React.useState(false)
  return (
    <nav role="navigation" aria-label="main-navigation">
      <Section className={className}>
        <ResponsiveContext.Consumer>
          {size =>
            size === 'small' ? (
              <Box direction="row" justify="end" pad="xsmall">
                <Box>
                  <Hamburger
                    menuVisible={menuVisible}
                    onClick={() => setMenuVisible(!menuVisible)}
                  />
                </Box>
                {menuVisible && (
                  <Layer
                    onEsc={() => setMenuVisible(false)}
                    onClickOutside={() => setMenuVisible(false)}
                    position="right"
                    full="vertical"
                    responsive={false}
                  >
                    <Menu
                      mobile
                      location={location}
                      onClick={() => setMenuVisible(false)}
                    />
                  </Layer>
                )}
              </Box>
            ) : (
              <Menu location={location} />
            )
          }
        </ResponsiveContext.Consumer>
      </Section>
    </nav>
  )
}

const FixedNavbar = styled(Navbar)`
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  mix-blend-mode: difference;
  z-index: 20;
`

export default FixedNavbar
