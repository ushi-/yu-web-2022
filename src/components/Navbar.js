import React from 'react'
import { ResponsiveContext } from 'grommet'
import styled from 'styled-components'

import Section from './Section'
import Menu from './Menu'

const Navbar = ({ className, location }) => {
  return (
    <nav role="navigation" aria-label="main-navigation">
      <Section className={className}>
        <ResponsiveContext.Consumer>
          {(size) => <Menu location={location} mobile={size === 'small'} />}
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
