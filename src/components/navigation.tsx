import { useVirtualKeyboardVisible } from "hooks";
import React, { FC, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MenuItem } from "types/menu";
import { BottomNavigation, Icon } from "zmp-ui";
import { CartIcon } from "./cart-icon";
import { openChat } from 'zmp-sdk/apis'; // Import openChat

const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: <Icon icon="zi-home" />,
  },
  "/cart": {
    label: "Giỏ hàng",
    icon: <CartIcon />,
    activeIcon: <CartIcon active />,
  },
  "/chat": {
    label: "Liên hệ",
    icon: <Icon icon="zi-chat" />,
  }
};

export type TabKeys = keyof typeof tabs;

export const NO_BOTTOM_NAVIGATION_PAGES = ["/search", "/category", "/result"];

export const Navigation: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKeys>("/");
  const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();
  const location = useLocation();

  const noBottomNav = useMemo(() => {
    return NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

  if (noBottomNav || keyboardVisible) {
    return <></>;
  }

  const openChatScreen = () => {
    openChat({
      type: 'oa',
      id: '4034193284491636322',
      message: 'Xin Chào',
      success: () => {
        // Handle success if needed
      },
      fail: (err) => {
        // Handle failure if needed
      }
    });
  };

  return (
    <BottomNavigation
      id="footer"
      activeKey={activeTab}
      onChange={(key: TabKeys) => setActiveTab(key)}
      className="z-50"
    >
      {Object.keys(tabs).map((path: TabKeys) => (
        <BottomNavigation.Item
          key={path}
          label={tabs[path].label}
          icon={tabs[path].icon}
          activeIcon={tabs[path].activeIcon}
          onClick={() => {
            if (path === "/chat") {
              openChatScreen(); // Gọi hàm openChatScreen khi nhấn vào tab chat
            } else {
              navigate(path); // Điều hướng đến các trang khác
            }
          }}
        />
      ))}
    </BottomNavigation>
  );
};
