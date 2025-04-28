import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Spin } from "antd";
import api from "@/services/request";
import { useNavigate } from "react-router-dom";
import { pathPublic } from "@/routers/helpers";
import colors from "@/consts/colors";
import { media } from "@/consts/adaptive";

const ManagementContainer = styled.div`
  max-width: 1000px;
  margin: 24px auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: ${colors.primary};
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  padding: 16px;
  background-color: #f5f5f5;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CardMain = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;

  ${media.xs} {
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 8px;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* font-size: 4rem; */
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 1.5rem;
  color: #555;
`;

const CardFooter = styled.button`
  padding: 16px;
  text-align: center;
  font-size: 1.2rem;
  background-color: #f5f5f5;
  border: 0px;

  &:hover {
    background-color: #ddd;
    cursor: pointer;
  }
`;

interface StaffType {
  id: number;
  image: string;
  phone_number: string;
  email: string;
  position: string;
  last_name: string;
  first_name: string;
}

interface LeaderDataType {
  id: number;
  title: string;
  staff_id: number;
  staff: StaffType;
  is_leader: boolean;
};

const ManagementPage: React.FC = () => {
  const [leaders, setLeaders] = useState<LeaderDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchManagementData();
  }, []);

  const fetchManagementData = async () => {
    setLoading(true);
    try {
      const response = await api.get(pathPublic.management);
      const sortedLeaders = response.data.sort(
        (a: LeaderDataType, b: LeaderDataType) => (b.is_leader ? 1 : 0) - (a.is_leader ? 1 : 0)
      );
      setLeaders(sortedLeaders);
    } catch (error) {
      console.error("Error fetching management data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ManagementContainer>
      <Title>Rəhbərlik</Title>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "auto" }} />
      ) : (
        leaders.map((leader) => (
          <Card key={leader.id}>
            <CardHeader>{leader.title}</CardHeader>
            <CardMain>
              <Image
                src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${leader.staff.image}`}
                alt={`${leader.staff.first_name} ${leader.staff.last_name}`}
              />
              <Info>
                <InfoText>
                  <i className="fa-solid fa-user-tie"></i>{" "}
                  {leader.staff.first_name} {leader.staff.last_name}
                </InfoText>
                <InfoText>
                  <i className="fa-solid fa-pen-to-square"></i>{" "}
                  {leader.staff.position}
                </InfoText>
                <InfoText>
                  <i className="fa-solid fa-envelope"></i> {leader.staff.email}
                </InfoText>
                <InfoText>
                  <i className="fa-solid fa-phone-volume"></i>{" "}
                  {leader.staff.phone_number}
                </InfoText>
              </Info>
            </CardMain>
            <CardFooter
              onClick={() => navigate(`${pathPublic.staff}/${leader.staff_id}`)}
            >
              Ətraflı
            </CardFooter>
          </Card>
        ))
      )}
    </ManagementContainer>
  );
};

export default ManagementPage;
