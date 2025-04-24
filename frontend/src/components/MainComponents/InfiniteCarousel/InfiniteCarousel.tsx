import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { pathPublic } from "@/routers/helpers";
import api from "@/services/request";

interface DataType {
  id: number;
  image_id: string;
  title: string;
}
const move = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const CarouselContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  width: 100%;
  max-width: 100vw;
`;

const CarouselTrack = styled.div`
  display: flex;
  animation: ${move} 10s linear infinite;
  &:hover {
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
    cursor: pointer;
  }
`;

const CarouselItem = styled.img`
  width: 150px;
  height: 150px;
  margin-right: 30px;
  margin-left: 30px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
  /* @media (max-width: 480px) {
    width: 75px;
    height: 75px;
  } */
`;

export default function InfiniteCarousel() {
  const [clones, setClones] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      await api
        .get<DataType[]>(`${pathPublic.cooperation}/images`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setClones(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <>Loading</>;
  }

  return (
    <CarouselContainer>
      <CarouselTrack>
        {clones.map((src, _) => (
          <CarouselItem
            key={src.id}
            src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${src.image_id}`}
            alt={src.title}
          />
        ))}
      </CarouselTrack>
    </CarouselContainer>
  );
}
