import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'grommet'

const MenuButton = ({ className, onClick }) => (
    <Button className={className} onClick={() => onClick()}>
      Show Menu
    </Button>
)

MenuButton.propTypes = {
  menuVisible: PropTypes.bool.isRequired,
  onClick: PropTypes.func
}

const HamburgerSize = {
  width: 40,
  height: 40
}

const HamburgerButton = styled(MenuButton)`
  /* Keeps the text 'Show Menu' off screen */
  text-indent: -9999px;
  position: relative;

  width: ${`${HamburgerSize.width}px`};
  height: ${`${HamburgerSize.height}px`};
  line-height: 0;
  font-size: 0;

  transition: opacity 0.2s ease-out;
  opacity: 1;
  :hover {
    opacity: 0.5;
  }

  ::before,
  ::after {
    content: '';
    text-indent: 0px;
    position: absolute;
    top: -1px;
    right: 0px;
    display: block;
    width: 20px;
    height: 2px;
    transition: transform 0.2s ease-out;
    background: white;
  }

  ::before {
    transform: ${props =>
      props.menuVisible
        ? `translate(0, ${HamburgerSize.height / 2}px) rotate(45deg)`
        : `translateY(${HamburgerSize.height / 2 - 3}px)`};
  }

  ::after {
    transform: ${props =>
      props.menuVisible
      ? `translate(0, ${HamburgerSize.height / 2}px) rotate(-45deg)`
        : `translateY(${HamburgerSize.height / 2 + 3}px)`};
  }

`
export default HamburgerButton
