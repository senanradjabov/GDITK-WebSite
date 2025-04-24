import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Spin } from "antd";
import api from "@/services/request";
import { pathPublic } from "@/routers/helpers";
import colors from "@/consts/colors";
import { useParams, useNavigate } from "react-router-dom";
import { Description, DescriptionContainer } from "@/App.styled";
import { media } from "@/consts/adaptive";
import { Helmet } from 'react-helmet-async';

const ManagementContainer = styled.div`
  max-width: 1200px;
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
  color: #000;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

interface Staff {
  id: number;
  image: string;
  last_name: string;
  first_name: string;
  position: string;
  email: string;
  phone_number: string;
}

const DepartmentPage: React.FC = () => {
  const { slugId } = useParams<{ slugId: string }>();
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [leader, setLeader] = useState<Staff>({
    id: 0,
    image: "",
    last_name: "",
    first_name: "",
    position: "",
    email: "",
    phone_number: "",
  });
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManagementData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`${pathPublic.department}/${slugId}`);
        setTitle(response.data.name);
        setDescription(response.data.description);
        setLeader(response.data.head_of_department);
        setStaffs(response.data.staff);
      } catch (error) {
        console.error("Error fetching management data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchManagementData();
  }, [slugId]);

  const handleCardClick = (slug: number) => {
    navigate(`/staff/${slug}`);
  };

  if (loading)
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <ManagementContainer>
        <Title>{title}</Title>

        <Card>
          <CardMain>
            <Image
              src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${leader.image}`}
              alt={`${leader.first_name} ${leader.last_name}`}
            />
            <Info>
              <InfoText>
                <i className="fa-solid fa-user-tie"></i> {leader.first_name}{" "}
                {leader.last_name}
              </InfoText>
              <InfoText>
                <i className="fa-solid fa-pen-to-square"></i> {leader.position}
              </InfoText>
              <InfoText>
                <i className="fa-solid fa-envelope"></i> {leader.email}
              </InfoText>
              <InfoText>
                <i className="fa-solid fa-phone-volume"></i>{" "}
                {leader.phone_number}
              </InfoText>
            </Info>
          </CardMain>
          <CardFooter onClick={() => handleCardClick(leader.id)}>
            Ətraflı
          </CardFooter>
        </Card>

        {staffs.map((staff) => (
          <Card key={staff.id}>
            <CardMain>
              <Image
                src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${staff.image}`}
                alt={`${staff.first_name} ${staff.last_name}`}
              />
              <Info>
                <InfoText>
                  <i className="fa-solid fa-user-tie"></i> {staff.first_name}{" "}
                  {staff.last_name}
                </InfoText>
                <InfoText>
                  <i className="fa-solid fa-pen-to-square"></i> {staff.position}
                </InfoText>
                <InfoText>
                  <i className="fa-solid fa-envelope"></i> {staff.email}
                </InfoText>
                <InfoText>
                  <i className="fa-solid fa-phone-volume"></i>{" "}
                  {staff.phone_number}
                </InfoText>
              </Info>
            </CardMain>
            <CardFooter
              onClick={() => navigate(`${pathPublic.staff}/${staff.id}`)}
            >
              Ətraflı
            </CardFooter>
          </Card>
        ))}
        <DescriptionContainer>
          <Description dangerouslySetInnerHTML={{ __html: description }} />
        </DescriptionContainer>
      </ManagementContainer>
    </>
  );
};

export default DepartmentPage;
