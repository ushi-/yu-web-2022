// Libraries
// import { Grommet, Box } from 'grommet'
import type { WindowLocation } from '@reach/router'
import React from 'react'
import Helmet from 'react-helmet'
// import isRelativeUrl from 'is-relative-url'

// Components
// import Footer from './Footer'
// import Navbar from './Navbar'
// import Theme, { GlobalStyle } from './Theme'
// import ogImage from '../images/og-image-omotenashi.jpg'

// Hooks
import useSiteMetadata from '../hooks/use-site-metadata'

interface Props {
  children: React.ReactNode
  location?: WindowLocation
}

const TemplateWrapper = ({ children, location }: Props) => {
  const { title, description, siteUrl, twitterUsername, image } =
    useSiteMetadata()
  // const ogImageUrl = isRelativeUrl(ogImage) ? `${siteUrl}${ogImage}` : ogImage
  return (
    <>
      {/* <Grommet theme={Theme}> */}
      {/* <GlobalStyle /> */}
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Add favicons here if needed */}
        <meta name="theme-color" content="#fff" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={location ? `${siteUrl}${location.pathname}` : siteUrl}
        />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}${image}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={twitterUsername} />
      </Helmet>
      {/* <Navbar location={location} /> */}
      {/* <Box pad={{ top: 'medium', bottom: 'medium' }}>{children}</Box> */}
      {children}
      {/* <Footer /> */}
      {/* </Grommet> */}
    </>
  )
}

export default TemplateWrapper
