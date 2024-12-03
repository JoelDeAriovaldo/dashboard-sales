import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/common/Sidebar";

const MainLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden absolute top-4 left-4 z-50"
        onClick={toggleMobileSidebar}
      >
        {isMobileSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar - Desktop */}
      <div className="hidden md:block w-64 shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="w-64 h-full bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:ml-0">{children}</main>
    </div>
  );
};

export default MainLayout;
