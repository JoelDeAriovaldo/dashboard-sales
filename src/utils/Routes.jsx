import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Login from "../pages/Login";
import AuthRoute from "../components/auth/AuthRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />

      {/* Rotas Protegidas */}
      <Route
        path={ROUTES.HOME}
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.SALES.LIST}
        element={
          <AuthRoute>
            <SalesDashboard />
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.SALES.REPORT}
        element={
          <AuthRoute>
            <SalesReport />
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.SALES.POS}
        element={
          <AuthRoute>
            <SalesPage />
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.SALES.DETAILS}
        element={
          <AuthRoute>
            <SaleDetails />
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.CRM.LIST}
        element={
          <AuthRoute>
            <CustomerList />
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.CRM.DETAILS}
        element={
          <AuthRoute>
            <CustomerProfile />
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.PRODUCTS.LIST}
        element={
          <AuthRoute>
            <ProductList />
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.PRODUCTS.DETAILS}
        element={
          <AuthRoute>
            <ProductDetails />
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.PRODUCTS.NEW}
        element={
          <AuthRoute>
            <ProductForm />
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.PRODUCTS.EDIT}
        element={
          <AuthRoute>
            <ProductForm />
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.PRODUCTS.CATEGORIES}
        element={
          <AuthRoute>
            <div>Product Categories</div>
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.PRODUCTS.INVENTORY}
        element={
          <AuthRoute>
            <div>Inventory Management</div>
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.ORDERS}
        element={
          <AuthRoute>
            <div>Orders Dashboard</div>
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
