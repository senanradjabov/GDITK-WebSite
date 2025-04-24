import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Spin } from "antd";
import api from "@/services/request";
import {
  Container,
  PageWrapper,
  Description,
  DescriptionContainer,
} from "@/App.styled";
import { pathPublic } from "@/routers/helpers";
import { Helmet } from 'react-helmet-async';

const NewsDetailContainer = styled.div`
  padding: 16px;

  @media (max-width: 768px) {
    padding: 8px;
    margin: 16px auto;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const NotFoundText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #333;
`;

const PageTitle = styled.h1`
  color: #000;
  text-align: center;
  margin-top: 24px;
  margin-bottom: 24px;
  font-size: 2rem;
  font-weight: bold;
`;

const HistoryPage: React.FC = () => {
  interface NewsDetail {
    description: string;
  }

  const [data, setData] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchNewsDetail();
  }, []);

  const fetchNewsDetail = async () => {
    setLoading(true);
    try {
      const response = await api.get(pathPublic.history);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching news detail:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Kollecin Tarixi</title>
      </Helmet>

      <Container>
        <PageTitle>Kollecin Tarixi</PageTitle>

        <PageWrapper>
          <NewsDetailContainer>
            {(() => {
              if (loading) {
                return (
                  <LoaderContainer>
                    <Spin size="large" />
                  </LoaderContainer>
                );
              } else if (data) {
                return (
                  <DescriptionContainer>
                    <Description
                      dangerouslySetInnerHTML={{
                        __html: data.description,
                      }}
                    />
                  </DescriptionContainer>
                );
              } else {
                return <NotFoundText>Not Found.</NotFoundText>;
              }
            })()}
          </NewsDetailContainer>
        </PageWrapper>
      </Container>
    </>
  );
};

export default HistoryPage;
