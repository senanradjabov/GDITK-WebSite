import React from "react";
import Flickity from "react-flickity-component";
import { Slide, SliderContainer } from "./styled";

import "flickity/dist/flickity.min.css";

interface SliderDataType {
  id: number;
  image_id: string;
  title: string;
}

interface MyComponentProps {
  slidesData: SliderDataType[]; // Массив объектов типа Item
}

// Описание интерфейса для параметров Flickity
const flickityOptions = {
  freeScroll: true,
  wrapAround: true,
  autoPlay: true,
  pageDots: true,
  fullscreen: true,
};

// Компонент слайдера
const FlickitySlider: React.FC<MyComponentProps> = ({ slidesData }) => {
  return (
    <SliderContainer>
      <Flickity
        className="carousel"
        elementType="div"
        options={flickityOptions}
      >
        {slidesData.map((slide) => (
          <Slide
            src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${slide.image_id}`}
            alt={slide.title}
            key={slide.id}
          />
        ))}
      </Flickity>
    </SliderContainer>
  );
};

export default FlickitySlider;
