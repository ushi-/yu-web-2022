import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { Anchor, Box } from 'grommet'
import styled from 'styled-components'

const NavItem = ({ label, location, mobile, to, noRightPad }) => {
  const LocationAwareAnchor = styled(Anchor)`
    opacity: ${location.pathname === to ? 0.6 : 1.0};
    pointer-events: ${location.pathname === to ? 'none' : 'auto'};
    cursor: ${location.pathname === to ? 'default' : 'pointer'};
  `
  return (
    <Box
      pad={
        noRightPad
          ? {
              vertical: 'small',
              left: 'small',
            }
          : 'small'
      }
    >
      <LocationAwareAnchor
        size={mobile ? 'large' : 'medium'}
        onClick={() => navigate(to)}
        color="white"
        label={label}
      />
    </Box>
  )
}

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  mobile: PropTypes.bool,
  noRightPad: PropTypes.bool,
  to: PropTypes.string.isRequired,
}

const Menu = ({ location, mobile }) => (
  <Box
    direction="row"
    justify="end"
    pad="xsmall"
    fill={false}
    background="transparent"
  >
    <NavItem label="Projects" location={location} to="/" mobile={mobile} />
    <NavItem label="Info" location={location} to="/about" mobile={mobile} />
  </Box>
)

export default Menu
