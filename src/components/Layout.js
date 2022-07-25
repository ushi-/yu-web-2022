import { Grommet, Box } from 'grommet'
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import isRelativeUrl from 'is-relative-url'

import Footer from './Footer'
import Navbar from './Navbar'
import useSiteMetadata from './SiteMetadata'
import Theme, { GlobalStyle } from './Theme'
import ogImage from '../img/og-image-omotenashi.jpg'

const TemplateWrapper = ({ children, location }) => {
  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()
  const ogImageUrl = isRelativeUrl(ogImage) ? `${siteUrl}${ogImage}` : ogImage
  return (
    <Grommet theme={Theme}>
      <GlobalStyle />
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Add favicons here if needed */}
        <meta name="theme-color" content="#fff" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}${location.pathname}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={twitterUsername} />
      </Helmet>
      <Navbar location={location} />
      <Box pad={{ top: 'medium', bottom: 'medium' }}>{children}</Box>
      <Footer />
    </Grommet>
  )
}

TemplateWrapper.propTypes = {
  location: PropTypes.object.isRequired
}

export default TemplateWrapper
