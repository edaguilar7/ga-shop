import React from 'react';
import { AppPaths } from 'config/paths';
import { Layout } from 'components/layout/Layout';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const CategoriesPage = React.lazy(() => import('pages/categories/Categories'));
const OrderConfirmationPage = React.lazy(() => import('pages/orderConfirmation/OrderConfirmation'));
const CategoryPage = React.lazy(() => import('pages/category/Category'));
const ProductPage = React.lazy(() => import('pages/product/Product'));
const PurchasePage = React.lazy(() => import('pages/purchase/Purchase'));
const ShoppingCartPage = React.lazy(() => import('pages/shoppingCart/ShoppingCart'));
const NotFound = React.lazy(() => import('pages/notFound/NotFound'));

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to={AppPaths.categories.path} />} />
        <Route path={AppPaths.categories.path}>
          <Route path=":id" element={<CategoryPage />} />
          <Route index element={<CategoriesPage />} />
        </Route>
        <Route path={AppPaths.orderConfirmation.path} element={<OrderConfirmationPage />} />
        <Route path={AppPaths.product.path} element={<ProductPage />} />
        <Route path={AppPaths.purchase.path} element={<PurchasePage />} />
        <Route path={AppPaths.shoppingCart.path} element={<ShoppingCartPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);
