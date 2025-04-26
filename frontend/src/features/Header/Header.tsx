import {
  HeaderSelf,
  TopBlock,
  BottomBlock,
  HorizontalLine,
  VerticalLine,
  Logo,
  Sections,
  SectionItem,
  SectionItemTitle,
  SearchBlock,
  SectionItemMainTitle,
  MobileHeaderSelf,
} from "./styled";

import { useState, useEffect } from "react";

import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { pathPublic } from "@/routers/helpers";

// import { Container, InnerWrapper } from "App.styled.tsx";
import { Container, InnerWrapper } from "@/App.styled";

import Navbar from "@/components/MainComponents/Navigation";
import Social from "@/components/MainComponents/Social";

import LogoImage from "@/assets/images/logo.png";
import MobileMenu from "@/components/MainComponents/MobileMenu";
import SearchModal from "@/components/MainComponents/Search";

import api from "@/services/request";

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    padding: 20px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
`;

const MobileMenuBtns = styled.div`
  display: flex;
  gap: 10px;
`;

interface NavigationItem {
  label: string;
  link?: string;
  children?: NavigationItem[];
}

interface DepartmentData {
  name: string;
  slug: string;
}

const initialMenuItems: NavigationItem[] = [
  { label: "Ana səhifə", link: "/" },
  { label: "İdarəetmə", link: "/management" },
  { label: "Xəbərlər", link: "/news" },
  { label: "Kollecin Tarixi", link: "/history" },
  { label: "Şöbə və bölmələr", children: [] },
  { label: "İxtisaslar", link: "/specialties" },
  {
    label: "Sənədlər",
    children: [
      { label: "Dərs cədvəlləri", link: "/schedule" },
      { label: "Sənədlər", link: "/documents" },
    ],
  },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const fetchManagementData = async () => {
    try {
      const response = await api.get(`/department`);

      const newChildren = response.data.map((item: DepartmentData) => ({
        label: item.name,
        link: `/department/${item.slug}`,
      }));

      setMenuItems((prev) => {
        const updatedMenu = [...prev];
        updatedMenu[4] = { ...updatedMenu[4], children: newChildren };
        return updatedMenu;
      });
    } catch (error) {
      console.error("Error fetching management data:", error);
    }
  };

  useEffect(() => {
    fetchManagementData();
  }, []);

  return (
    <>
      <MobileHeaderSelf>
        <Link to={pathPublic.home}>
          <Logo src={LogoImage} />
        </Link>
        <SectionItemMainTitle>
          Göyçay Dövlət İdarəetmə <br/>və Texnologiya Kolleci
        </SectionItemMainTitle>

        <MobileMenuBtns>
          <SearchBlock onClick={() => setSearchVisible(true)}>
            <i className="fas fa-search" style={{ color: "#000" }}></i>
          </SearchBlock>
          <Button onClick={() => setOpen(true)} icon={<MenuOutlined />} />
        </MobileMenuBtns>

        <StyledDrawer
          title={null}
          closable={true}
          onClose={() => setOpen(false)}
          open={open}
          width="100vw"
        >
          <MobileMenu handleClose={handleClose} menuItems={menuItems} />

          <FooterLinks>
            <Social />
            <Link to={pathPublic.appeal}>
              <SectionItem>
                <i className="fa-solid fa-file-signature" aria-hidden></i>
                <SectionItemTitle>Direktora müraciət</SectionItemTitle>
              </SectionItem>
            </Link>
          </FooterLinks>
        </StyledDrawer>
      </MobileHeaderSelf>

      <HeaderSelf>
        <Container>
          <InnerWrapper>
            <TopBlock>
              <Sections>
                <SectionItem>
                  <Social />
                </SectionItem>
              </Sections>

              <Sections>
                <SectionItemMainTitle>
                  Göyçay Dövlət İdarəetmə və Texnologiya Kolleci
                </SectionItemMainTitle>
              </Sections>

              <Sections>
                <VerticalLine />

                <Link to={pathPublic.appeal}>
                  <SectionItem>
                    <i className="fa-solid fa-file-signature" aria-hidden></i>
                    <SectionItemTitle>Direktora müraciət</SectionItemTitle>
                  </SectionItem>
                </Link>

                <VerticalLine />

                <SectionItem>
                  <SearchBlock onClick={() => setSearchVisible(true)}>
                    <i className="fas fa-search" style={{ color: "#000" }}></i>
                  </SearchBlock>
                </SectionItem>
              </Sections>
            </TopBlock>

            <HorizontalLine />

            <BottomBlock>
              <Logo src={LogoImage} />
              <Navbar menuItems={menuItems} />
            </BottomBlock>
          </InnerWrapper>
        </Container>
      </HeaderSelf>

      <SearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
      />
    </>
  );
};

export default Header;
