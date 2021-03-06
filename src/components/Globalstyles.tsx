import { createGlobalStyle } from "styled-components";

import { dimensions, fonts, colors, breakpoints } from "../styles/variables";
import { getEmSize } from "../styles/mixins";

const GlobalStyles = createGlobalStyle`
  html {
      box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    transition: color 0.2s ease-out, background 0.2s ease-out;
  }

  html {
    font-size: ${dimensions.fontSize.regular}px !important;
    line-height: ${dimensions.lineHeight.regular} !important;
    margin: 0;
    height: 100%;
  }
  body {
    margin: 0;
    width: 100%;
    overflow-y: scroll;
    font-family: ${fonts.sansSerif};
    background-color: transparent;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;

    --background: ${colors.light.background};
    --surface: ${colors.light.surface};
    --primary: ${colors.light.primary};
    --secondary: ${colors.light.secondary};
    --onBackground: ${colors.light.onBackground};
    --onSurface: ${colors.light.onSurface};
    --onPrimary: ${colors.light.onPrimary};
    --onSecondary: ${colors.light.onSecondary};

    --uiBright: ${colors.light.ui.bright};
    --uiLight: ${colors.light.ui.light};
    --uiWhisper: ${colors.light.ui.whisper};
    --uiDescent: ${colors.light.ui.descent};

    --shadesGrey: ${colors.light.shades.grey};

    --shadowsPrimary: ${colors.light.shadows.primary};
  
    background-color: var(--background);
    

  }

  body.dark {
    -webkit-font-smoothing: antialiased;
 
    --background: ${colors.dark.background};
    --surface: ${colors.dark.surface};
    --primary: ${colors.dark.primary};
    --secondary: ${colors.dark.secondary};
    --onBackground: ${colors.dark.onBackground};
    --onSurface: ${colors.dark.onSurface};
    --onPrimary: ${colors.dark.onPrimary};
    --onSecondary: ${colors.dark.onSecondary};

    --uiBright: ${colors.dark.ui.bright};
    --uiLight: ${colors.dark.ui.light};
    --uiWhisper: ${colors.dark.ui.whisper};
    --uiDescent: ${colors.dark.ui.descent};

    --shadesGrey: ${colors.dark.shades.grey};

    --shadowsPrimary: ${colors.dark.shadows.primary};

    background-color: var(--background);
  }

  a {
    color: var(--onBackground);
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: none;
    }
  }

  img {
    max-width: 100%;
    object-fit: contain;
    position: relative;
  }

  figure {
    margin: 2rem 0;
  }

  figcaption {
    font-size: 80%;
  }

  table {
    width: 100%;
    margin-bottom: 1rem;
    border: 1px solid var(--uiLight);
    font-size: 85%;
    border-collapse: collapse;
  }

  td,
  th {
    padding: .25rem .5rem;
    border: 1px solid var(--uiLight);
  }

  th {
    text-align: left;
  }

  tbody {
    tr {
      &:nth-of-type(odd) {
        td {
          background-color: var(--uiWhisper);
        }
        tr {
          background-color: var(--uiWhisper);
        }
      }
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.414rem;
    margin-bottom: .5rem;
    color: var(--onBackground);
    font-weight: 600;
    line-height: ${dimensions.lineHeight.heading};
    text-rendering: optimizeLegibility;
  }

  h1 {
    margin-top: 0;
    font-size: ${dimensions.headingSizes.h1}rem;
  }

  h2 {
    font-size: ${dimensions.headingSizes.h2}rem;
  }

  h3 {
    font-size: ${dimensions.headingSizes.h3}rem;
  }

  h4, h5, h6 {
    font-size: ${dimensions.headingSizes.h4}rem;
  }

  p {
    word-break: break-word;
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--onBackground)
  }

  strong {
    color: var(--onBackground);
  }

  ul,
  ol,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  dt {
    font-weight: bold;
  }

  dd {
    margin-bottom: .5rem;
  }

  hr {
    position: relative;
    margin: 1.5rem 0;
    border: 0;
    border-top: 1px solid var(--uiLight);
  }

  blockquote {
    margin: .8rem 0;
    padding: .5rem 1rem;
    border-left: .25rem solid var(--uiLight);
    color: var(--uiWhisper);

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }

    @media (min-width: ${getEmSize(breakpoints.md)}em) {
      padding-right: 5rem;
      padding-left: 1.25rem;
    }
  }
`;

export default GlobalStyles;
