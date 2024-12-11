import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const MainLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block w-8 shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area with Navbar */}
      <div className="flex-1">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 text-gray-600 dark:text-gray-300"
          onClick={toggleMobileSidebar}
        >
          {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="pt-20 px-6 pb-6 md:pl-6 md:pr-8 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="w-64 h-full bg-white dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
