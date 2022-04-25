import { AppRoutes } from 'components/routes';
import { CartProvider, StockProvider } from 'context';

const App = () => (
  <CartProvider>
    <StockProvider>
      <AppRoutes />
    </StockProvider>
  </CartProvider>
);

export default App;
