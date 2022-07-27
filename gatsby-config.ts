import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Yosuke Ushigome',
    twitterUsername: '@ushi_',
    description:
      'Creative technologist based in London. Future visions. Proof-of-concept prototypes. New interactions.',
    siteUrl: 'https://www.yosukeushigo.me',
    image: '/og-image-omotenashi.jpg',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/img/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 960,
              linkImagesToOriginal: false,
              quality: 90,
              tracedSVG: true,
              wrapperStyle: 'margin-top: 0.33em; margin-bottom: 0.33em',
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          'gatsby-remark-component',
          'gatsby-remark-external-links',
          {
            resolve: 'gatsby-remark-embed-video',
            options: { width: 768 },
          },
          'gatsby-remark-responsive-iframe', //Optional: Must be loaded after gatsby-remark-embed-video
        ],
      },
    },
  ],
}

export default config
