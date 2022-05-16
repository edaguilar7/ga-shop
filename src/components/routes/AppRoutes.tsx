import React, { useEffect } from 'react';
import { AppPaths } from 'config/paths';
import { Environment } from 'utils/Environment';
import GTMModule from 'react-gtm-module';
import { Layout } from 'components/layout/Layout';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';

const OrderConfirmationPage = React.lazy(() => import('pages/orderConfirmation/OrderConfirmation'));
const ProductPage = React.lazy(() => import('pages/product/Product'));
const ProductsPage = React.lazy(() => import('pages/products/Products'));
const PurchasePage = React.lazy(() => import('pages/purchase/Purchase'));
const ShoppingCartPage = React.lazy(() => import('pages/shoppingCart/ShoppingCart'));
const NotFound = React.lazy(() => import('pages/notFound/NotFound'));
const Buttons = React.lazy(() => import('pages/buttons/Buttons'));

export const AppRoutes = () => {
  useEffect(() => {
    GTMModule.initialize({
      gtmId: Environment.gtmTrackingId,
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to={AppPaths.products.path} />} />
          <Route path={AppPaths.products.path}>
            <Route index element={<ProductsPage />} />
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path={AppPaths.orderConfirmation.path} element={<OrderConfirmationPage />} />
          <Route path={AppPaths.purchase.path} element={<PurchasePage />} />
          <Route path={AppPaths.shoppingCart.path} element={<ShoppingCartPage />} />
        </Route>
        <Route path="/buttons" element={<Buttons />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
