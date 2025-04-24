import { useEffect, useState } from "react";

import { Container } from "@/App.styled";
import api from "@/services/request";

import styled from "styled-components";
import { Helmet } from 'react-helmet-async';
import { Card } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { pathPublic } from "@/routers/helpers";

import FlickitySlider from "@/components/MainComponents/FlickitySlider";
import FacultySection from "@/components/MainComponents/FacultySection";
import GoogleMapComponent from "@/components/MainComponents/GoogleMapComponent";
import InfiniteCarousel from "@/components/MainComponents/InfiniteCarousel";

const { Meta } = Card;

interface SliderDataType {
  id: number;
  image_id: string;
  title: string;
}

interface HeadOfDepartmentDataType {
  first_name: string;
  last_name: string;
  position: string;
  email: string;
  phone_number: string;
}

interface DepartmentDataType {
  id: number;
  name: string;
  slug: string;
  head_of_department: HeadOfDepartmentDataType;
}

interface NewsType {
  id: number;
  title: string;
  image_id: string;
  slug: string;
  created_at: string;
}

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  padding: 0 16px;
`;

const SectionTitle = styled.h2`
  color: rgb(0, 0, 0);
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 32px;

  @media only screen and (max-width: 576px) {
    margin-bottom: 0;
  }
`;

const AllNewsTitle = styled.p`
  color: rgb(0, 0, 0);
  margin-bottom: 20px;
  margin-right: 10px;
  text-align: right;
  font-size: 22px;
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [dataSlider, setDataSlider] = useState<SliderDataType[]>([]);
  const [news, setNews] = useState<NewsType[]>([]);
  const [dataDepartment, setDataDepartment] = useState<DepartmentDataType[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      await api
        .get<SliderDataType[]>(`${pathPublic.gallerySlider}/images`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setDataSlider(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.error("Ошибка:", error);
    }

    setLoading(true);

    try {
      const response = await api.get(`${pathPublic.news}/default`, {
        params: { page: 1, size: 3 },
      });
      setNews(response.data.items);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }

    setLoading(true);
    try {
      await api
        .get<DepartmentDataType[]>(`${pathPublic.department}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setDataDepartment(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (slug: string) => {
    navigate(`/news/${slug}`);
  };

  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("az-AZ", options);
  };

  if (loading) {
    return <>Loading</>;
  }

  return (
    <>
      <Helmet>
        <title>GDITK</title>
      </Helmet>
      <FlickitySlider slidesData={dataSlider} />
      <Container>
        <FacultySection departmentData={dataDepartment} />
        <SectionTitle>Xəbərlər</SectionTitle>
        <AllNewsTitle>
          <Link to={pathPublic.news}>Bütün xəbərlər →</Link>
        </AllNewsTitle>
        <NewsGrid>
          {news.map((item) => (
            <Card
              key={item.id}
              hoverable
              cover={
                <img
                  alt={item.title}
                  src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${item.image_id}`}
                  style={{ objectFit: "cover", maxHeight: "300px" }}
                />
              }
              onClick={() => handleCardClick(item.slug)}
            >
              <Meta
                title={item.title}
                description={formatDateTime(item.created_at)}
              />
            </Card>
          ))}
        </NewsGrid>
        <GoogleMapComponent />
        <InfiniteCarousel />
      </Container>
    </>
  );
};

export default HomePage;
