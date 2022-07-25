import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { debounce } from 'lodash'

import { Heading1 } from '../components/Theme'
import { getStyle, setStyle } from './Utils'

const Headline = styled(Heading1).attrs(({ size }) => ({
  size: size
}))`
  line-height: 1.15;
  font-size: ${props => props.size};
  margin: 0;
  padding-top: 0.33em;
`

const Wrapper = styled.div.attrs(({ height }) => ({
  height: height
}))`
  height: ${props => props.height};
`

export default class FluidHeadline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wrapperHeight: '100px',
      fontSize: '32px'
    }
    this.wrapperRef = React.createRef()
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    this.handleResize()
    if (window) {
      window.addEventListener('resize', debounce(this.handleResize, 200))
    }
  }

  handleResize() {
    if (this.wrapperRef.current && window) {
      const rect = this.wrapperRef.current.getBoundingClientRect()
      const wrapperHeight =
        window.innerHeight - (rect.top + window.scrollY) - 200

      if (this.wrapperClone) {
        this.deleteWrapperClone()
      }
      this.wrapperClone = this.createWrapperClone(wrapperHeight)
      const headlineClone = this.wrapperClone.childNodes[0]
      setStyle(headlineClone)

      let fontSize = Math.floor(wrapperHeight / 10)
      let complete = false
      const margin = fontSize * 2
      const step = 1
      let headlineHeight = wrapperHeight
      while (!complete) {
        setStyle(headlineClone, { fontSize: `${fontSize}px` })
        headlineHeight = headlineClone.offsetHeight
        if (wrapperHeight < headlineHeight) {
          fontSize -= step
        } else if (headlineHeight < wrapperHeight - margin) {
          fontSize += step
        } else {
          complete = true
        }
      }
      this.setState(
        {
          wrapperHeight: `${headlineHeight}px`,
          fontSize: `${fontSize}px`
        },
        () => this.deleteWrapperClone()
      )
    }
  }

  createWrapperClone(wrapperHeight) {
    const wrapperClone = this.wrapperRef.current.cloneNode(true)
    setStyle(wrapperClone, {
      position: 'absolute',
      top: '0px',
      left: 'calc(100vw * 2)',
      width: getStyle(this.wrapperRef.current, 'width'),
      height: `${wrapperHeight}px`
    })
    document.body.appendChild(wrapperClone)
    return wrapperClone
  }

  deleteWrapperClone() {
    if (this.wrapperClone) {
      document.body.removeChild(this.wrapperClone)
    }
    this.wrapperClone = null
  }

  render() {
    return (
      <Wrapper ref={this.wrapperRef} height={this.state.wrapperHeight}>
        <Headline size={this.state.fontSize}>{this.props.headline}</Headline>
      </Wrapper>
    )
  }
}

FluidHeadline.propTypes = {
  headline: PropTypes.string.isRequired
}
