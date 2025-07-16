import React, { useState, useEffect, useRef } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";
import Dashboard from "@/pages/Dashboard";
import NightAudit from "@/pages/NightAudit";
import Reports from "@/pages/Reports";
import OnTheBooks from "@/pages/OnTheBooks";
import NotFound from "./pages/NotFound";
import { cn } from "@/lib/utils";
import Login from "@/pages/Login";
import PROPERTIES from "@/constants/properties";
import HotelDashboard from "@/pages/HotelDashboard";
import Budgeting from "@/pages/Budgeting";
import Accounting from "@/pages/Accounting";
import Forecasting from "@/pages/Forecasting";
import LaborAnalytics from "@/pages/LaborAnalytics";
import UploadDailyReports from "@/pages/UploadDailyReports";
import ViewDownloadReports from "@/pages/ViewDownloadReports";

const queryClient = new QueryClient();

function isSmallScreen() {
  return window.innerWidth <= 1024;
}

function AppRoutes() {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/") {
    return (
      <div>
        <Login />
      </div>
    );
  }

  return <MainLayout />;
}

function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(PROPERTIES[0]);
  const manualToggle = useRef(false);

  useEffect(() => {
    const updateSidebar = () => {
      if (!manualToggle.current) {
        setSidebarCollapsed(isSmallScreen());
      }
    };

    updateSidebar();

    const handleResize = () => {
      updateSidebar();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      manualToggle.current = true;
      return !prev;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full flex-col">
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />

      <TopNavbar
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={toggleSidebar}
        selectedHotel={selectedHotel}
        setSelectedHotel={setSelectedHotel}
      />

      <main
        className={cn(
          "pt-16 transition-all duration-300 flex-1",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <div className="p-6 w-full">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hotel-dashboard" element={<HotelDashboard selectedHotel={selectedHotel} />} />
            <Route path="/night-audit" element={<NightAudit />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/budgeting" element={<Budgeting selectedHotel={selectedHotel} />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/forecasting" element={<Forecasting selectedHotel={selectedHotel} />} />
            <Route path="/labor-analytics" element={<LaborAnalytics selectedHotel={selectedHotel} />} />
            <Route path="/on-the-books" element={<OnTheBooks />} />
            <Route path="/upload-daily-reports" element={<UploadDailyReports />} />
            <Route path="/view-download-reports" element={<ViewDownloadReports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>

      <div
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
