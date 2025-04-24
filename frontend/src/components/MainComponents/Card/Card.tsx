import React from "react";
import styled from "styled-components";

// Контейнер карточки
const Card = styled.div`
  position: relative;
  width: 200px;
  height: 100px;
  background: white;
  color: blue;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(5deg); /* Наклон карточки вправо */
  }

  &:hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: red;
    z-index: -1; /* Размещаем под содержимым карточки */
    transform: rotate(-5deg); /* Наклон заднего слоя влево */
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 1; /* Делает фон видимым */
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: red;
    z-index: -1;
    transform: rotate(-5deg);
    opacity: 0; /* Изначально фон невидим */
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
`;

const CardComponent: React.FC = () => {
  return <Card>Hover Me</Card>;
};

export default CardComponent;
