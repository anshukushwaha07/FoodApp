import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "../components/Loader/Loader";
import MainLayout from "../layouts/MainLayout.jsx";

// 🔐 NEW imports
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// Lazy-loaded pages
const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Signup = lazy(() => import("../pages/Signup/Signup"));
const Restaurant = lazy(() => import("../pages/Restaurant/Restaurant"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Orders = lazy(() => import("../pages/Orders/Orders"));
const Admin = lazy(() => import("../pages/Admin/Admin"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* ✅ PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <MainLayout>
              <Signup />
            </MainLayout>
          }
        />

        <Route
          path="/restaurant/:id"
          element={
            <MainLayout>
              <Restaurant />
            </MainLayout>
          }
        />

        {/* 🔐 USER PROTECTED ROUTES */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Cart />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Orders />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* 🧑‍💼 ADMIN PROTECTED ROUTE */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <MainLayout>
                <Admin />
              </MainLayout>
            </AdminRoute>
          }
        />

        {/* ❌ NOT FOUND */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
