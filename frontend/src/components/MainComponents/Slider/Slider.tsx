// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/keyboard";
import 'swiper/swiper.min.css';
import 'swiper/modules/free-mode/free-mode.min.css';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/thumbs/thumbs.min.css';

import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules";



const slidesData = [
  {
    id: 1,
    imgSrc: "https://atu.edu.az/images/carusel/3.jpg",
    name: "Lorem ipsum 1",
  },
  {
    id: 2,
    imgSrc: "https://atu.edu.az/images/carusel/4.jpg",
    name: "Lorem ipsum 2",
  },
  {
    id: 3,
    imgSrc: "https://atu.edu.az/images/carusel/5.jpg",
    name: "Lorem ipsum 3",
  },
  {
    id: 4,
    imgSrc: "https://atu.edu.az/images/carusel/6.jpg",
    name: "Lorem ipsum 4",
  },
  {
    id: 5,
    imgSrc: "https://atu.edu.az/images/carusel/3.jpg",
    name: "Lorem ipsum 5",
  },
  {
    id: 6,
    imgSrc: "https://atu.edu.az/images/carusel/4.jpg",
    name: "Lorem ipsum 6",
  },
  {
    id: 7,
    imgSrc: "https://atu.edu.az/images/carusel/5.jpg",
    name: "Lorem ipsum 7",
  },
];

const Lunchbox = styled.div`
  position: relative;
`;

const StyledSwiper = styled(Swiper)`
  /* margin-top: 2em; */

  .swiper-wrapper {
    /* margin-bottom: 3em; */

    @media (min-width: 37.5em) {
      width: 100%;
    }
  }
`;

const Product = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
`;

const Photograph = styled.img`
  display: block;
  height: 70%;
  width: 50%;
`;

const Slider: React.FC = () => {
  return (
    <Lunchbox>
      <StyledSwiper
        modules={[Navigation, Pagination, Keyboard, A11y]}
        id="swiper1"
        loop={true}
        slidesPerView={1}
        // spaceBetween={50}
        autoplay={true}
        speed={50}
        centeredSlides={true}
        keyboard={{ enabled: true }}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={{ nextEl: "#js-next1", prevEl: "#js-prev1" }}
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Product>
              <Photograph src={slide.imgSrc} alt={slide.name} />
            </Product>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Lunchbox>
  );
};

export default Slider;
