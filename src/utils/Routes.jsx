// Routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants";
import Dashboard from "../pages/Dashboard"; // Adicionar import
import ProductList from "../features/products/ProductList";
import ProductDetails from "../features/products/ProductDetails";
import ProductForm from "../features/products/ProductForm";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas principais */}
      <Route path="/" element={<Dashboard />} />{" "}
      {/* Redireciona raiz para dashboard */}
      <Route path={ROUTES.HOME} element={<Dashboard />} />
      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTES.SALES} element={<div>Sales Dashboard</div>} />
      <Route path={ROUTES.CRM} element={<div>CRM Dashboard</div>} />
      {/* Rotas de produtos */}
      <Route path={ROUTES.PRODUCTS.LIST} element={<ProductList />} />
      <Route path={ROUTES.PRODUCTS.DETAILS} element={<ProductDetails />} />
      <Route path={ROUTES.PRODUCTS.NEW} element={<ProductForm />} />
      <Route path={ROUTES.PRODUCTS.EDIT} element={<ProductForm />} />
      <Route
        path={ROUTES.PRODUCTS.CATEGORIES}
        element={<div>Product Categories</div>}
      />
      <Route
        path={ROUTES.PRODUCTS.INVENTORY}
        element={<div>Inventory Management</div>}
      />
      <Route path={ROUTES.ORDERS} element={<div>Orders Dashboard</div>} />
    </Routes>
  );
};

export default AppRoutes;