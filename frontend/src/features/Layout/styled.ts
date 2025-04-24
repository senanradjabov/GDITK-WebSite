import styled from "styled-components";

import { ADMIN_HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/consts";
import colors from "@/consts/colors";

export const LayoutWrapper = styled.div`
  background-color: ${colors.grey};
  padding: 20px;
  font-family: "Roboto", sans-serif;
`;

export const Header = styled.header`
  background-color: ${colors.white};
  min-height: ${ADMIN_HEADER_HEIGHT}px;
  width: 100%;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ContentWrapper = styled.div`
  display: flex;
`;

export const SideBar = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-width: ${SIDEBAR_WIDTH}px;
  min-height: calc(100vh - 60px - ${ADMIN_HEADER_HEIGHT}px);
`;

export const Navigation = styled.nav`
  min-height: 300px;
  background-color: ${colors.white};
  border-radius: 20px;
  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  & .active {
    color: ${colors.blue};
    background-color: ${colors.lightBlue};
    border-radius: 8px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  min-height: 80px;
  background-color: ${colors.white};
  border-radius: 20px;
  padding: 20px;
`;

export const Outer = styled.main`
  min-height: 300px;
  width: 100%;
  margin-left: 20px;
  background-color: ${colors.white};
  border-radius: 20px;
  padding: 20px;
`;

export const UserName = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

export const NavigationItem = styled.div`
  padding: 8px 14px;
  width: 100%;

  display: flex;
  gap: 10px;
  align-items: center;
`;

export const NavigationItemTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
`;
