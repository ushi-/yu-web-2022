import { createGlobalStyle } from 'styled-components'
import React from 'react'
import { Heading } from 'grommet'
import styled from 'styled-components'

import {
  WhyteRegularWoff,
  WhyteRegularWoff2,
  WhyteinktrapBoldWoff,
  WhyteinktrapBoldWoff2,
} from '../fonts'

const Theme = {
  global: {
    colors: {
      brand: '#6060FF',
      control: {
        light: 'brand',
      },
      focus: 'brand',
      text: {
        light: 'black',
      },
    },
    focus: {
      border: {
        color: 'brand',
      },
    },
    font: {
      family: 'Whyte',
    },
    input: {
      padding: '6px',
    },
  },
  anchor: {
    fontWeight: 400,
    hover: {
      textDecoration: 'none',
      extend: `
        opacity: 0.6;
      `,
    },
    color: 'brand',
    extend: `
      transition: 0.2s ease-out;
    `,
  },
  formField: {
    label: {
      margin: {
        horizontal: 'xsmall',
      },
    },
  },
  heading: {
    level: {
      1: {
        font: {
          family: 'Whyte Inktrap',
        },
        medium: {
          size: '32px',
          height: '1.25',
        },
      },
      2: {
        font: {
          family: 'Whyte Inktrap',
        },
        medium: {
          size: '24px',
          height: '1.25',
        },
      },
      3: {
        font: {
          weight: 400,
        },
        medium: {
          size: '20px',
          height: '1.25',
          weight: '300',
        },
      },
      4: {
        font: {
          family: 'Whyte Inktrap',
        },
        medium: {
          size: '14px',
          height: '1.25',
          maxWidth: 'inherit',
        },
        margin: {
          bottom: '0',
        },
      },
    },
    responsiveBreakpoint: '',
    extend: `
      color: inherit;
    `,
  },
  layer: {
    border: {
      radius: 0,
    },
    background: 'transparent',
  },
  paragraph: {
    medium: {
      size: '14px',
      height: '1.4',
      maxWidth: '768px',
    },
    large: {
      size: '20px',
      height: '1.25',
      maxWidth: '768px',
    },
    extend: `
      margin-top: 0.33em;
      margin-bottom: 1em;
    `,
  },
  text: {
    medium: {
      size: '14px',
      height: '1.4',
      maxWidth: '768px',
    },
    large: {
      size: '20px',
      height: '1.25',
      maxWidth: '768px',
    },
  },
}

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Whyte";
    src: url(${WhyteRegularWoff2}) format('woff2'), url(${WhyteRegularWoff}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: "Whyte Inktrap";
    src: url(${WhyteinktrapBoldWoff2}) format('woff2'), url(${WhyteinktrapBoldWoff}) format('woff');
    font-display: swap;
  }
  body {
    font-family: 'Whyte', 'Helvitica', sans-serif;
    margin: 0;
  }
  #___gatsby {
    background-color: white;
  }
  ::selection {
    background: #6060FF; /* WebKit/Blink Browsers */
    color: #fff;
  }
  ul {
    list-style: none;
    margin-left: 0;
    padding-left: 1em;
    text-indent: -1em;
    margin-top: 0.33em;
    margin-bottom: 0.33em;
  }
  li {
    font-size: ${Theme.text.medium.size};
    line-height: ${Theme.text.medium.height};
    max-width: ${Theme.text.medium.maxWidth};
  }
  li:before {
    content: "― ";
  }
  summary {
    font-size: ${Theme.text.medium.size};
    line-height: ${Theme.text.medium.height};
    max-width: ${Theme.text.medium.maxWidth};
    list-style: disclosure-closed inside;
    /* margin-left: 0; */
    padding-left: 1em;
    text-indent: -1em;
    margin-top: 0.33em;
    margin-bottom: 0.33em;
    cursor: pointer;
  }
  video {
    margin-top: 0.33em;
    margin-bottom: 0.33em;
  }
`

export default Theme

export const Heading1 = (props) => (
  <Heading className={props.className} level={'1'}>
    {props.children}
  </Heading>
)
export const Heading2 = (props) => (
  <Heading className={props.className} level={'2'}>
    {props.children}
  </Heading>
)
export const Heading3 = (props) => (
  <Heading className={props.className} level={'3'}>
    {props.children}
  </Heading>
)
export const Heading4 = (props) => (
  <Heading className={props.className} level={'4'}>
    {props.children}
  </Heading>
)
export const Heading4NoMargin = styled(Heading4)`
  margin-bottom: 0.33em;
`
