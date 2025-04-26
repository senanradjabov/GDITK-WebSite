import styled from "styled-components";

import colors from "@/consts/colors";
import { HEADER_HEIGHT } from "@/consts";
import { media } from "@/consts/adaptive";
// Header

export const HeaderSelf = styled.header`
  background-color: ${colors.primary};
  width: 100%;
  min-height: ${HEADER_HEIGHT}px;
  padding-bottom: 10px;

  ${media.sm} {
    display: none;
  }
`;

export const MobileHeaderSelf = styled.header`
  display: none;
  background-color: ${colors.primary};
  width: 100%;
  min-height: 100px;
  padding: 20px;

  ${media.sm} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ${media.sm} {
    padding: 10px;
  }
`;

// Top block

export const TopBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
`;

export const Logo = styled.img`
  height: 140px;
  background-color: #fff;

  ${media.lg} {
    height: 100px;
  }
  ${media.md} {
    height: 90px;
  }
  ${media.xs} {
    height: 70px;
  }
`;

export const Sections = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const SectionItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 1rem;
  color: #fff;

  a {
    color: inherit;
  }

  ${media.sm} {
    color: #000;
  }
`;

export const SectionItemTitle = styled.p`
  ${media.sm} {
    color: #000;
  }
`;

export const SectionItemMainTitle = styled.p`
  font-size: 22px;
  color: #fff;
  font-weight: 600;

  ${media.xs} {
    font-size: 16px;
  }
`;

export const SearchBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

// Bottom block

export const BottomBlock = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */

  ${media.sm} {
    display: none;
  }
`;

// Line

export const VerticalLine = styled.div`
  width: 2px; /* Ширина линии */
  height: 18px; /* Высота линии */
  background-color: white; /* Цвет линии */
  /* margin: 20px auto;  Центрирование (опционально) */
`;

export const HorizontalLine = styled.div`
  height: 2px;
  width: 100%;
  background-color: white;

  ${media.sm} {
    display: none;
  }
`;
