import React from 'react'
import PropTypes from 'prop-types'
import rehypeReact from 'rehype-react'
import { Anchor, Paragraph } from 'grommet'

import { Heading1, Heading2, Heading3, Heading4NoMargin } from './Theme'
import VideoPlayer from './VideoPlayer'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4NoMargin,
    p: Paragraph,
    a: Anchor,
    'video-player': VideoPlayer
  }
}).Compiler

export const HTMLContent = ({ content, contentAst, className }) => {
  const HTMLContent = contentAst ? (
    renderAst(contentAst)
  ) : (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  )
  return HTMLContent
}

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
)

Content.propTypes = {
  content: PropTypes.node,
  contentAst: PropTypes.object,
  className: PropTypes.string
}

HTMLContent.propTypes = Content.propTypes

export default Content
