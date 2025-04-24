import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import api from "@/services/request";
import colors from "@/consts/colors";
import { Helmet } from 'react-helmet-async';
import { Description, DescriptionContainer } from "@/App.styled";

const StaffDetailsContainer = styled.div`
  max-width: 1200px;
  margin: 24px auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
  color: ${colors.primary};
`;

const Image = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 16px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoItem = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: #555;

  & strong {
    color: #000;
  }
`;

const StaffDetailsPage: React.FC = () => {
  const { staffId } = useParams<{ staffId: string }>();
  interface Staff {
    image: string;
    first_name: string;
    last_name: string;
    position: string;
    email: string;
    phone_number: string;
    description: string;
  }

  const [staff, setStaff] = useState<Staff | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStaffDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/staff/${staffId}`);
        setStaff(response.data);
      } catch (error) {
        console.error("Error fetching staff details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffDetails();
  }, [staffId]);



  if (loading) {
    return (
      <StaffDetailsContainer>
        <Spin size="large" style={{ display: "block", margin: "auto" }} />
      </StaffDetailsContainer>
    );
  }

  if (!staff) {
    return (
      <StaffDetailsContainer>
        <Title>Информация не найдена</Title>
      </StaffDetailsContainer>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${staff.first_name} ${staff.last_name}`}</title>
      </Helmet>

      <StaffDetailsContainer>
        <Image
          src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${staff.image}`}
          alt={`${staff.first_name} ${staff.last_name}`}
        />
        <InfoSection>
          <InfoItem>
            <strong>Adı:</strong> {staff.first_name} {staff.last_name}
          </InfoItem>
          <InfoItem>
            <strong>Vəzifə:</strong> {staff.position}
          </InfoItem>
          <InfoItem>
            <strong>Mail:</strong> {staff.email}
          </InfoItem>
          <InfoItem>
            <strong>Telefon:</strong> {staff.phone_number}
          </InfoItem>
        </InfoSection>
        <DescriptionContainer>
          <Description
            dangerouslySetInnerHTML={{
              __html: staff.description,
            }}
          />
        </DescriptionContainer>
      </StaffDetailsContainer>
    </>
  );
};

export default StaffDetailsPage;
