import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { Anchor, Box } from 'grommet'
import styled from 'styled-components'
import { scroller } from 'react-scroll'

const NavItem = ({
  label,
  location,
  mobile,
  to,
  type,
  noRightPad,
  onClick
}) => {
  const LocationAwareAnchor = styled(Anchor)`
    opacity: ${props => (location.pathname === to ? 0.6 : 1.0)};
    pointer-events: ${props => (location.pathname === to ? 'none' : 'auto')};
    cursor: ${props => (location.pathname === to ? 'default' : 'pointer')};
  `
  return (
    <Box
      pad={
        noRightPad
          ? {
              vertical: 'small',
              left: 'small'
            }
          : 'small'
      }
    >
      <LocationAwareAnchor
        size={mobile ? 'large' : 'medium'}
        href={type === 'externalLink' ? to : null}
        target={type === 'externalLink' ? 'blank' : null}
        onClick={() => {
          if (type === 'page') {
            navigate(to)
          } else if (type === 'component') {
            scroller.scrollTo(to, {
              duration: 800,
              delay: 0,
              smooth: 'easeInOutQuint'
            })
            onClick && onClick()
          }
        }}
        color={mobile ? 'black' : 'white'}
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
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['page', 'externalLink', 'component']),
  to: PropTypes.string.isRequired
}

const Menu = ({ location, mobile, onClick }) => (
  <Box
    direction={mobile ? 'column' : 'row'}
    justify={mobile ? 'start' : 'end'}
    pad={mobile ? { horizontal: 'large', top: 'xlarge' } : 'xsmall'}
    fill={mobile ? 'vertical' : false}
    background={mobile ? 'white' : 'transparent'}
  >
    <NavItem
      label="Home"
      location={location}
      to="/"
      type="page"
      mobile={mobile}
    />
    <NavItem
      label="About"
      location={location}
      to="/about"
      type="page"
      mobile={mobile}
    />
    <NavItem
      label="Writing"
      location={location}
      to="https://medium.com/@yosukeushigome"
      type="externalLink"
      mobile={mobile}
    />
    <NavItem
      label="Contact"
      location={location}
      to="contact"
      type="component"
      noRightPad
      mobile={mobile}
      onClick={onClick}
    />
  </Box>
)

export default Menu
