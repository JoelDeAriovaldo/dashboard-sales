import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  LineChart,
  Users,
  Package,
  ShoppingCart,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 h-screen w-64 fixed left-0 top-0 text-white p-4">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold mb-8 px-4"
        >
          <LayoutDashboard size={24} />
          <span>Dashboard</span>
        </Link>

        {/* Links de navegação */}
        <nav className="flex-1">
          <div className="space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/sales"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <LineChart size={20} />
              <span>Sales</span>
            </Link>

            <Link
              to="/crm"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <Users size={20} />
              <span>CRM</span>
            </Link>

            <Link
              to="/products"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <Package size={20} />
              <span>Products</span>
            </Link>

            <Link
              to="/orders"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <ShoppingCart size={20} />
              <span>Orders</span>
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto px-4 py-4 text-sm text-gray-400">
          <p>&copy; 2024 Dashboard</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
