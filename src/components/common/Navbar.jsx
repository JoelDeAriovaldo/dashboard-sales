import React, { useState } from "react";
import { User, Settings, LogOut, Bell } from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    console.log("Logout clicked");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 h-16 px-4 shadow-sm fixed top-0 right-0 left-0 z-20">
      <div className="h-full flex items-center justify-between">
        {/* Lado Esquerdo - Título ou Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Dashboard
          </h1>
        </div>

        {/* Lado Direito - Notificações e Menu do Usuário */}
        <div className="flex items-center gap-4">
          {/* Notificações */}
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative">
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* Menu do Usuário */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <User size={20} className="text-gray-600 dark:text-gray-300" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                John Doe
              </span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => console.log("Profile clicked")}
                  className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <User size={16} />
                  Perfil
                </button>
                <button
                  onClick={() => console.log("Settings clicked")}
                  className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <Settings size={16} />
                  Configurações
                </button>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
