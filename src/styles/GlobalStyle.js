import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Segoe UI", Arial, sans-serif;
    margin: 0;
    line-height: 1.4;
  }
`;

export default GlobalStyle;
