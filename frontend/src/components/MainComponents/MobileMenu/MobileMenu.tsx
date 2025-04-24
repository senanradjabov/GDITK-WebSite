import { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import api from "@/services/request";

interface NavigationItem {
  label: string;
  link?: string;
  children?: NavigationItem[];
}

interface MobileMenuProps {
  handleClose: () => void;
}

const initialMenuItems: NavigationItem[] = [
  { label: "Ana səhifə", link: "/home" },
  { label: "İdarəetmə", link: "/management" },
  { label: "Xəbərlər", link: "/news" },
  { label: "Kollecin Tarixi", link: "/history" },
  { label: "Tədris", children: [] },
  {
    label: "Services",
    children: [
      { label: "Dərs cədvəlləri", link: "/schedule" },
      { label: "Sənədlər", link: "/documents" },
    ],
  },
];

// Динамическое построение меню

const MobileMenu: React.FC<MobileMenuProps> = ({ handleClose }) => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const renderMenuItems = (items: NavigationItem[]) =>
    items.map((item) =>
      item.children && item.children.length > 0 ? (
        <Menu.SubMenu key={item.label} title={<span>{item.label}</span>}>
          {renderMenuItems(item.children)}
        </Menu.SubMenu>
      ) : (
        <Menu.Item key={item.link || item.label} onClick={handleClose}>
          <Link to={item.link || "#"}>{item.label}</Link>
        </Menu.Item>
      )
    );

  const fetchManagementData = async () => {
    try {
      const response = await api.get(`/department`); // Замените на ваш endpoint

      const newChildren = response.data.map((item: any) => ({
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

  return <Menu mode="inline">{renderMenuItems(menuItems)}</Menu>;
};

export default MobileMenu;
