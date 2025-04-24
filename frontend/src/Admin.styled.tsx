import styled, { createGlobalStyle } from "styled-components";

import colors from "@/consts/colors";

//
// Global tags styling
//
export const AppStyles = createGlobalStyle`
*,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    /* -webkit-font-smoothing: antialiased; */
    /* -moz-osx-font-smoothing: grayscale; */
    /* font-family: 'Montserrat', sans-serif; */
    /* font-size: 14px; */
    /* font-style: normal; */
    /* font-weight: normal; */
    /* color: #5e5873; */
    min-width: 320px;
  }

  a {
    color: inherit;
    text-decoration: inherit;
    color: ${colors.primary};
  }
`;

//
// Global app styled components
//

export const PageWrapper = styled.div`
  padding: 20px;
  min-height: calc(100vh);
`;
