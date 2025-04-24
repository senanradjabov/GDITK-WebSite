import styled from "styled-components";

export const PaginationWrapper = styled.div`
  width: 100%;
  margin: 30px 0;
  background-color: #fff;
  padding: 15px;
  border-radius: 30px;
`;

export const MainNewsTextArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
`;

export const NewsTitle = styled.p`
  color: #db4747;
  font-size: 30px;
  font-weight: 600;
  width: max-content;
`;

export const AllNewsButton = styled.p`
  background-color: #db4747;
  color: #fff;
  font-size: 20px;
  padding: 15px;
  width: max-content;

  &::after {
    content: " ->";
  }

  &:hover {
    cursor: pointer;
  }
`;

export const RecentNewsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

export const NewsItemTag = styled.div`
  background-color: #fff;
  border-radius: 30px;
  max-width: 280px;
`;

export const NewsItemImage = styled.img`
  border-radius: 30px;
`;

export const NewsItemDate = styled.div`
  margin-top: 20px;
  margin-left: 15px;
  margin-bottom: 20px;
  color: #8c8c8c;
`;

export const NewsItemTitle = styled.div`
  margin-left: 15px;
  color: #000;
  font-size: 16px;
  font-weight: 500;
`;

export const NewsItemDescription = styled.div`
  margin-top: 20px;
  margin-left: 15px;
  margin-bottom: 20px;
  color: #8c8c8c;
`;
