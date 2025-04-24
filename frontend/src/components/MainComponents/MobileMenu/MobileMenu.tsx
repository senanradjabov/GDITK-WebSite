import { Menu } from "antd";
import { Link } from "react-router-dom";


interface NavigationItem {
  label: string;
  link?: string;
  children?: NavigationItem[];
}

interface MobileMenuProps {
  handleClose: () => void;
  menuItems: NavigationItem[]
}


// Динамическое построение меню

const MobileMenu: React.FC<MobileMenuProps> = ({ handleClose, menuItems }) => {
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

  return <Menu mode="inline">{renderMenuItems(menuItems)}</Menu>;
};

export default MobileMenu;
