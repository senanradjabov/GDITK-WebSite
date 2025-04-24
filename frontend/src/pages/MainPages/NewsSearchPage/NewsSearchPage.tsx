import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Pagination, Card, Spin } from "antd";
import api from "@/services/request";
import { pathPublic } from "@/routers/helpers";
import { Helmet } from 'react-helmet-async';

const { Meta } = Card;

const NewsContainer = styled.div`
  max-width: 1200px;
  margin: 24px auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 300px;
`;

const PageTitle = styled.h1`
  color: #000;
  text-align: center;
  margin-bottom: 16px;
  font-size: 2rem;
  font-weight: bold;
`;

const NotFoundText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #333;
`;

interface NewsType {
  id: number;
  title: string;
  image_id: string;
  slug: string;
  created_at: string;
}

const NewsSearchPage: React.FC = () => {
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const pageSize = 20;

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const navigate = useNavigate();

  useEffect(() => {
    fetchNews(currentPage, query);
  }, [currentPage, query]);

  const fetchNews = async (page: number, query: string) => {
    setLoading(true);
    try {
      const response = await api.get(`${pathPublic.news}/search`, {
        params: { query: query, page: page, size: pageSize },
      });
      setNews(response.data.items);
      setTotalItems(response.data.total_items);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  return (
    <>
      <Helmet>
        <title>Xəbər axtarışı</title>
      </Helmet>

      <NewsContainer>
        <PageTitle>Xəbər axtarışı</PageTitle>
        {(() => {
          if (loading) {
            return (
              <LoaderContainer>
                <Spin size="large" />
              </LoaderContainer>
            );
          } else if (news.length === 0) {
            return <NotFoundText>Not Found.</NotFoundText>;
          } else {
            return (
              <>
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
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalItems}
                  onChange={handlePageChange}
                  style={{ marginTop: "16px", textAlign: "center" }}
                />
              </>
            );
          }
        })()}
        {/* {loading ? (
          <LoaderContainer>
            <Spin size="large" />
          </LoaderContainer>
        ) : (
          <>
            <NewsGrid>
              {news.map((item) => (
                <Card
                  key={item.id}
                  hoverable
                  cover={
                    <img
                      alt={item.title}
                      src={`${domainUrl}/images/id/${item.image_id}`}
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
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItems}
              onChange={handlePageChange}
              style={{ marginTop: "16px", textAlign: "center" }}
            />
          </>
        )} */}
      </NewsContainer>
    </>
  );
};

export default NewsSearchPage;
