import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-dashboard-bg flex">
      {/* Mobile Header with Hamburger */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border p-4 flex items-center justify-between lg:hidden">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">SR</span>
            </div>
            <h1 className="text-lg font-bold text-primary">SR Institutes</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="p-2"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile 
          ? `fixed left-0 top-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }` 
          : 'relative'
        }
      `}>
        <Sidebar onClose={closeSidebar} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${isMobile ? 'pt-16' : ''}`}>
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;