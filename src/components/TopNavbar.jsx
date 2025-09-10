import React from 'react';
import { cn } from '@/lib/utils';
import PageTitle, { usePageTitle } from './navbar/PageTitle';
import HotelSelector from './navbar/HotelSelector';
import NotificationBell from './navbar/NotificationBell';
import UserMenu from './navbar/UserMenu';
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePropertyStore } from "@/store/propertyStore";

const TopNavbar = ({
  sidebarCollapsed,
  onToggleSidebar,
}) => {
  const pageTitle = usePageTitle();
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();
  const { selectedHotel, setSelectedHotel } = usePropertyStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-14 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 z-20 transition-all duration-300 shadow-sm",
        sidebarCollapsed ? "left-16" : "left-64"
      )}
    >
      <div className="h-full flex items-center justify-between px-6">
        {/* Left Section - Page Title */}
        <PageTitle title={pageTitle} />

        {/* Right Section - Hotel Selector, Notifications, User Menu */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <HotelSelector 
            selectedHotel={selectedHotel}
            setSelectedHotel={setSelectedHotel}
          />
          {/* <NotificationBell /> */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
