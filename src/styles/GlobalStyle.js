import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: "Segoe UI", Arial, sans-serif;
    line-height: 1.4;
    margin: 0;
  }
`;

export default GlobalStyle;
