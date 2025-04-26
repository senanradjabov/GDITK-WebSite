import { useEffect, useState } from "react";
import {
  LayoutWrapper,
  Header,
  ContentWrapper,
  SideBar,
  Navigation,
  Footer,
  Outer,
  UserName,
  NavigationItem,
  NavigationItemTitle,
} from "./styled";

import { Outlet, NavLink, useNavigate } from "react-router-dom";

import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";

import { adminPaths } from "@/routers/helpers";

import api from "@/services/request";

import axios, { AxiosError } from "axios";

interface UserResponse {
  id: number;
  username: string;
}

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<UserResponse>();

  useEffect(() => {
    setLoading(true);

    async function getMe() {
      try {
        const response = await api.get<UserResponse>("/auth/me", {
          headers: {
            Accept: "application/json", 
          },
          withCredentials: true,
        });

        setUserInfo(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;

          if (axiosError.response?.status === 401) {
            console.error("Не авторизован", axiosError);
          } else {
            console.error("Данные ответа ошибки:", axiosError.response?.data);
          }
        } else {
          console.error("Ошибка:", error);
        }

        navigate(adminPaths.logout);
      }
    }
    getMe();
  }, [navigate]);

  if (loading) return null;

  return (
    <LayoutWrapper>
      <Header>
        <Avatar size={40} icon={<UserOutlined />} />
        <UserName>{userInfo?.username}</UserName>
      </Header>
      <ContentWrapper>
        <SideBar>
          <Navigation>
            <NavLink to={adminPaths.home}>
              <NavigationItem>
                <HomeOutlined size={24} />
                <NavigationItemTitle>Ana səhifə</NavigationItemTitle>
              </NavigationItem>
            </NavLink>
            <NavLink to={adminPaths.gallerySlider}>
              <NavigationItem>
                <FileTextOutlined size={24} />
                <NavigationItemTitle>Slider</NavigationItemTitle>
              </NavigationItem>
            </NavLink>
            <NavLink to={adminPaths.cooperation}>
              <NavigationItem>
                <FileTextOutlined size={24} />
                <NavigationItemTitle>Əməkdaşlar</NavigationItemTitle>
              </NavigationItem>
            </NavLink>
            <NavLink to={adminPaths.newsList}>
              <NavigationItem>
                <FileTextOutlined size={24} />
                <NavigationItemTitle>Xəbərlər</NavigationItemTitle>
              </NavigationItem>
            </NavLink>
            <NavLink to={adminPaths.department}>
              <NavigationItem>
                <FileTextOutlined size={24} />
                <NavigationItemTitle>Şöbə və bölmələr</NavigationItemTitle>
              </NavigationItem>
            </NavLink>
            <NavLink to={adminPaths.staff}>
              <NavigationItem>
                <FileTextOutlined size={24} />
                <NavigationItemTitle>Personal</NavigationItemTitle>
              </NavigationItem>
            </NavLink>
            <NavLink to={adminPaths.manage}>
              <NavigationItem>
                <FileTextOutlined size={24} />
                <NavigationItemTitle>İdarəetmə</NavigationItemTitle>
              </NavigationItem>
            </NavLink>
            <NavLink to={adminPaths.history}>
              <NavigationItem>
                <FileTextOutlined size={24} />
                <NavigationItemTitle>Kollecin Tarixi</NavigationItemTitle>
              </NavigationItem>
            </NavLink>
            <NavLink to={adminPaths.appeal}>
              <NavigationItem>
                <FileTextOutlined size={24} />
                <NavigationItemTitle>Müraciət</NavigationItemTitle>
              </NavigationItem>
            </NavLink>
            <NavLink to={adminPaths.documents}>
              <NavigationItem>
                <FileTextOutlined size={24} />
                <NavigationItemTitle>Sənədlər</NavigationItemTitle>
              </NavigationItem>
            </NavLink>
            <NavLink to={adminPaths.schedule}>
              <NavigationItem>
                <FileTextOutlined size={24} />
                <NavigationItemTitle>Dərs Cədvəli</NavigationItemTitle>
              </NavigationItem>
            </NavLink>
            <NavLink to={adminPaths.specialties}>
              <NavigationItem>
                <FileTextOutlined size={24} />
                <NavigationItemTitle>Ixtisas</NavigationItemTitle>
              </NavigationItem>
            </NavLink>
            <NavLink to={adminPaths.user}>
              <NavigationItem>
                <FileTextOutlined size={24} />
                <NavigationItemTitle>Moder</NavigationItemTitle>
              </NavigationItem>
            </NavLink>
            <NavLink to={adminPaths.logout}>
              <NavigationItem>
                <LogoutOutlined size={24} />
                <NavigationItemTitle>Log out</NavigationItemTitle>
              </NavigationItem>
            </NavLink>
          </Navigation>
          <Footer>Footer</Footer>
        </SideBar>
        <Outer>
          <Outlet />
        </Outer>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
