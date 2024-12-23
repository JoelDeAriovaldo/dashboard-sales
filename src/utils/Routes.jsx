import React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants";
import Dashboard from "../pages/Dashboard";
import SalesDashboard from "../features/sales/SalesDashboard";
import SalesReport from "../features/sales/SalesReport";
import ProductList from "../features/products/ProductList";
import ProductDetails from "../features/products/ProductDetails";
import ProductForm from "../features/products/ProductForm";
import SaleDetails from "../features/sales/SaleDetails";
import SalesPage from "../pages/SalesPage";
import CustomerList from "../features/crm/CustomerList";
import CustomerProfile from "../features/crm/CustomerProfile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path={ROUTES.HOME} element={<Dashboard />} />
      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTES.SALES.LIST} element={<SalesDashboard />} />
      <Route path={ROUTES.SALES.REPORT} element={<SalesReport />} />
      <Route path={ROUTES.SALES.POS} element={<SalesPage />} />
      <Route path={ROUTES.SALES.DETAILS} element={<SaleDetails />} />
      <Route path={ROUTES.CRM.LIST} element={<CustomerList />} />
      <Route path={ROUTES.CRM.DETAILS} element={<CustomerProfile />} />
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
