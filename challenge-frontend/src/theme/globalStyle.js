import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,900|Roboto');

  body {
    padding: 0;
    margin: 0;
    font-family: Roboto, sans-serif;
  }
`;

export { GlobalStyle };
