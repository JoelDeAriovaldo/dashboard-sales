import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  LineChart,
  Users,
  Package,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ROUTES } from "../../utils/constants";

const Sidebar = ({ isExpanded, toggleSidebar }) => {
  // Não renderizar a sidebar na página de login
  if (location.pathname === ROUTES.LOGIN) {
    return null;
  }
  return (
    <aside
      className={`bg-gray-800 h-screen fixed left-0 top-0 text-white p-4 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center gap-2 text-xl font-bold mb-8 px-4 ${
            isExpanded ? "justify-start" : "justify-center"
          }`}
        >
          <LayoutDashboard size={24} />
          {isExpanded && <span>Dashboard</span>}
        </Link>

        {/* Links de navegação */}
        <nav className="flex-1">
          <div className="space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <LayoutDashboard size={20} />
              {isExpanded && <span>Dashboard</span>}
            </Link>

            <Link
              to="/sales"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <LineChart size={20} />
              {isExpanded && <span>Sales</span>}
            </Link>

            <Link
              to="/crm/customers"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <Users size={20} />
              {isExpanded && <span>Customers</span>}
            </Link>

            <Link
              to="/products"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <Package size={20} />
              {isExpanded && <span>Products</span>}
            </Link>

            {/* <Link
              to="/orders"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <ShoppingCart size={20} />
              {isExpanded && <span>Orders</span>}
            </Link> */}
          </div>
        </nav>

        {/* Botão de Expandir/Colapsar */}
        <button
          className="mt-auto px-4 py-4 text-sm text-gray-400 flex items-center justify-center"
          onClick={toggleSidebar}
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
