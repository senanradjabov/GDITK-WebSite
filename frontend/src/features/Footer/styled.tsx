import styled from "styled-components";

import colors from "@/consts/colors";

import { FOOTER_TOP_HEIGHT, FOOTER_BOTTOM_HEIGHT } from "@/consts";
import { media } from "@/consts/adaptive";

export const FooterSelf = styled.footer`
  color: #fff;
  margin-top: 30px;
`;

// Top Block

export const TopBlock = styled.div`
  background-color: ${colors.primary};
`;

export const TopBlockWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: ${FOOTER_TOP_HEIGHT}px;

  ${media.xs} {
    flex-direction: column;
    gap: 20px;
    min-height: ${FOOTER_TOP_HEIGHT}px;
    padding: 20px;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 33.33%;

  &:first-child {
    align-items: self-start;
  }

  ${media.xs} {
    width: 63.33%;
    justify-content: center;
    align-items: center;

    &:first-child {
      display: none;
    }
  }
`;

export const Logo = styled.img`
  height: 125px;
  background-color: #fff;
`;

export const SocialSelf = styled.div`
  display: flex;
  gap: 10px;
  font-size: 24px;
  font-weight: 400;
  color: #fff;

  a {
    color: inherit;
  }
`;

export const Address = styled.p`
  font-size: 18px;
  color: #fff;
  text-align: center;
`;

export const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`;

export const Link = styled.div`
  color: #fff;
  font-size: 18px;

  a {
    color: inherit;
  }

  a i {
    margin-right: 10px;
  }
`;

// Bottom Block

export const BottomBlock = styled.div`
  background-color: #1f1f1f;
`;

export const BottomBlockSelf = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${FOOTER_BOTTOM_HEIGHT}px;
`;

export const Label = styled.p`
  color: #f0f0f0;
  font-size: 15px;
  font-weight: 300;
`;
