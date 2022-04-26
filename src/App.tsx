import { AppRoutes } from 'components/routes';
import { CartProvider, StockProvider } from 'context';
import { Suspense } from 'react';
import { Spin } from 'antd';

const App = () => (
  <CartProvider>
    <StockProvider>
      <Suspense fallback={<Spin tip="Loading page..." />}>
        <AppRoutes />
      </Suspense>
    </StockProvider>
  </CartProvider>
);

export default App;
