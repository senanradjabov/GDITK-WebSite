import styled from "styled-components";

import colors from "@/consts/colors";
import { media } from "@/consts/adaptive";

// Секция Service
export const ServiceSectionSelf = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

// Заголовок H2
export const SectionTitle = styled.h2`
  color: rgb(0, 0, 0);
  margin: 20px 20px;
  text-align: center;
  font-size: 32px;
`;

// Контейнер для карточек
export const CardsContainer = styled.div`
  display: grid;
  justify-content: center;
  gap: 50px;
  z-index: 9;
  margin: 20px 0;
  width: 100%;
  padding-inline: 40px;

  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
    margin-top: 0;
  }
`;

// Карточка
export const Card = styled.div`
  min-height: 330px;
  width: 330px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0 6%;
  background: ${colors.primary};
  font-style: normal;
  /* text-decoration: none; */
  text-decoration: none;
  position: relative;
  border-radius: 10px;

  &::before {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    border-radius: 10px;
    background-color: red;
    background-image: linear-gradient(326deg, #272822 0%, #da2d2d 74%);
    transition: transform 0.6s ease;
    transform: rotate(0deg);
    z-index: -1;
  }

  &:hover:before {
    transform: rotate(5deg);
  }
`;

// Картинка в карточке
export const CardImage = styled.img`
  width: 120px;
  height: 120px;
  margin: 20px 0;
  align-self: center; /* Центрируем изображение */
  text-decoration: underline;
`;

// Иконка
// export const CardIcon = styled.i`
//   font-size: 2.5rem;
//   margin-top: 40px;
//   margin-bottom: 10px;
//   text-align: center;
//   color: var(--primary-color);
// `;

// Заголовок в карточке
export const CardTitle = styled.h3`
  font-size: 1.6rem;
  color: #fff;
  margin: 50px 0px;
  text-align: center;
  /* min-height: 70px; */
  text-decoration: underline;
`;

// Контент в карточке
export const CardContent = styled.div`
  margin-top: 20px;

  p {
    color: rgb(216, 216, 216);
    font-size: 1.2rem;
    margin-bottom: 20px;
    font-weight: 500;
    text-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
  }
`;
