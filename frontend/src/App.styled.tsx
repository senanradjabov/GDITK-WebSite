import styled, { createGlobalStyle } from "styled-components";

import colors from "@/consts/colors";
import { HEADER_HEIGHT, FOOTER_HEIGHT, CONTAINER_WIDTH } from "@/consts";

//
// Global tags styling
//
export const AppStyles = createGlobalStyle`
 body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  color: #fff;
  min-width: 320px;
  background-color: #fff;
  }
  
  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
  }
  a:active, /* активная/посещенная ссылка */
  a:hover,  /* при наведении */
  a {
    text-decoration: none;
    color: #666;
  }
`;

//
// Global app styled components
//

export const Container = styled.div`
  max-width: ${CONTAINER_WIDTH}px;
  margin: 0 auto;
`;

export const InnerWrapper = styled.div`
  padding: 0 20px;
`;

export const PageWrapper = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
`;

export const Footer = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  background-color: ${colors.primary};
  color: #fff;
  height: ${FOOTER_HEIGHT};

  > :last-child {
    cursor: pointer;
  }
`;

export const Description = styled.div`
  margin-top: 50px;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  word-wrap: break-word;

  h1,
  h2,
  h3,
  h4 {
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    margin: 8px 0;
  }

  ul {
    padding-left: 20px;
    list-style-type: disc;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 10px auto;
    border-radius: 5px;
  }

  iframe,
  video {
    width: 100%;
    height: auto;
    max-height: 600px;
    display: block;
    margin: 10px auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    overflow-x: auto;
    display: block;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background: #f4f4f4;
    font-weight: bold;
  }
`;

export const DescriptionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: hidden;
`;
