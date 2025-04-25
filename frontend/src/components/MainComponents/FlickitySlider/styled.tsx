import styled from "styled-components";

import { media } from "@/consts/adaptive";

// Styled Components для контейнера слайдера
export const SliderContainer = styled.div`
  width: 100%; /* Адаптивная ширина */
  margin: 50px auto; /* Центрирование */
`;

// Styled Components для слайдов
export const Slide = styled.img`
  width: 56%; /* Ширина каждого слайда */
  height: 540px; /* Фиксированная высота */
  margin: 0 10px; /* Отступы между слайдами */
  background: "#ddd";
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;

  border-radius: 8px; /* Скругленные углы */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Тень */

  ${media.lg} {
    height: 500px;
  }

  ${media.md} {
    width: 80%;
    height: 460px;
  }

  ${media.sm} {
    width: 85%;
    height: 400px;
  }

  ${media.xs} {
    height: 330px;
    width: 95%;
  }

  /* @media (max-width: 768px) {
    width: 90%;
    height: 400px;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    width: 95%;
    height: 300px;
    font-size: 16px;
  } */
`;
