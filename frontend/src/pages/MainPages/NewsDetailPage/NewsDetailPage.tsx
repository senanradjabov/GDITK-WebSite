import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Spin } from "antd";
import api from "@/services/request";
import {
  Container,
  PageWrapper,
  Description,
  DescriptionContainer,
} from "@/App.styled";
import { Helmet } from 'react-helmet-async';

import FlickitySlider from "@/components/MainComponents/FlickitySlider";

interface SliderDataType {
  id: number;
  image_id: string;
  title?: string;
}

const NewsDetailContainer = styled.div`
  margin: 24px auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #333;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const DateText = styled.p`
  font-size: 0.9rem;
  color: #888;
  text-align: center;
`;

const NotFoundText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #333;
`;

const NewsDetailPage: React.FC = () => {
  const { slugId } = useParams<{ slugId: string }>();

  interface NewsDetail {
    title: string;
    created_at: string;
    description: string;
  }

  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSlider, setDataSlider] = useState<SliderDataType[]>([]);


  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/news/default/${slugId}`);
        setNewsDetail(response.data);
        const response2 = await api.get(`/news/default/images/${slugId}`);
        setDataSlider(response2.data)
      } catch (error) {
        console.error("Error fetching news detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [slugId]);

  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  return (
    <>
      <Helmet>
        <title>{newsDetail?.title ?? "Xəbər"}</title>
      </Helmet>
      <Container>
        <PageWrapper>
          <NewsDetailContainer>
            {(() => {
              if (loading) {
                return (
                  <LoaderContainer>
                    <Spin size="large" />
                  </LoaderContainer>
                );
              } else if (newsDetail) {
                return (
                  <>
                    <Title>{newsDetail.title}</Title>
                    <DateText>{formatDateTime(newsDetail.created_at)}</DateText>
                    <DescriptionContainer>
                      <Description
                        dangerouslySetInnerHTML={{
                          __html: newsDetail.description,
                        }}
                      />
                    </DescriptionContainer>
                  </>
                );
              } else {
                return <NotFoundText>Not Found.</NotFoundText>;
              }
            })()}
            <FlickitySlider slidesData={dataSlider} />
          </NewsDetailContainer>
        </PageWrapper>
      </Container>
    </>
  );
};

export default NewsDetailPage;
