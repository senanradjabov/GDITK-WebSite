import styled from "styled-components";
import { BoxShadow } from "@/consts";

import colors from "@/consts/colors";

export const PageWrapper = styled.div`
  /* background-color: ${colors.loginBg}; */
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginWrapper = styled.div`
  display: flex;

  background-color: ${colors.loginBoxBg};
  box-shadow: ${BoxShadow};
  border-radius: 12px;

  max-height: 500px;
  max-width: 1000px;
`;

export const LoginBox = styled.div`
  min-width: 500px;
  padding: 90px 60px;

  .ant-form-item {
    margin-bottom: 35px;
  }

  .ant-form-item:last-child {
    margin-bottom: 0px;
  }
`;

export const LoginTitle = styled.p`
  font-family: "Josefin Sans", sans-serif;
  font-size: 42px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 40px;
  user-select: none;
`;

export const ImageWrapper = styled.div`
  border-left: 2px solid rgba(0, 0, 0, 0.16);
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
`;
