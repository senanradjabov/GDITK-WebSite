import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "./style.css";

interface NavigationItem {
  label: string;
  link?: string;
  children?: NavigationItem[];
}

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

const Navbar: React.FC<{ menuItems: NavigationItem[] }> = ({ menuItems }) => {
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
