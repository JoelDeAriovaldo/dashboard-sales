import React from "react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import AppRoutes from "./utils/Routes";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-4 p-6">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
