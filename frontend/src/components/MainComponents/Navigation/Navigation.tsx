import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "@/services/request"; // Замените на ваш API сервис
import "./style.css";

interface NavigationItem {
  label: string;
  link?: string;
  children?: NavigationItem[];
}

const initialMenuItems: NavigationItem[] = [
  { label: "Ana səhifə", link: "/" },
  { label: "İdarəetmə", link: "/management" },
  { label: "Xəbərlər", link: "/news" },
  { label: "Kollecin Tarixi", link: "/history" },
  { label: "Şöbələr", children: [] },
  { label: "İxtisaslar", link: "/specialties" },
  {
    label: "AyrI",
    children: [
      { label: "Dərs cədvəlləri", link: "/schedule" },
      { label: "Sənədlər", link: "/documents" },
    ],
  },
];

const MenuItems: React.FC<{ items: NavigationItem; depthLevel: number }> = ({
  items,
  depthLevel,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const handler = (event: any) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => setDropdown(true);
  const onMouseLeave = () => setDropdown(false);

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.children ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.label}{" "}
            {depthLevel > 0 ? (
              <span>&raquo;</span>
            ) : (
              <span className="arrow"></span>
            )}
          </button>
          <Dropdown
            submenus={items.children}
            dropdown={dropdown}
            depthLevel={depthLevel}
          />
        </>
      ) : (
        <Link to={items.link ?? "#"}>{items.label}</Link>
      )}
    </li>
  );
};

const Dropdown: React.FC<{
  submenus: NavigationItem[];
  dropdown: boolean;
  depthLevel: number;
}> = ({ submenus, dropdown, depthLevel }) => {
  depthLevel += 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);

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

  return (
    <nav className="main-nav">
      <ul className="menus">
        {menuItems.map((menu, index) => (
          <MenuItems items={menu} key={index} depthLevel={0} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
