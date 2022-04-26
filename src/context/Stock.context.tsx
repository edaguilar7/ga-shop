import { createContext, ReactChild, useState, useCallback, useMemo } from 'react';
import { Loadable } from 'types/state';
import { Product } from 'types/product';
import { initLoadable, setData, setLoading } from 'utils/state';
import { Environment } from 'utils/Environment';
import axios from 'axios';

type CategoriesState = {
  products: Loadable<Product[]>;
  loadProducts: () => Promise<void>;
};

const initialState: CategoriesState = {
  products: initLoadable([]),
  loadProducts: () => Promise.resolve(),
};

export const StockContext = createContext<CategoriesState>(initialState);

export const StockProvider = ({ children }: { children: ReactChild }) => {
  const [products, setProducts] = useState(initialState.products);

  const loadProducts = useCallback(async () => {
    try {
      setProducts(setLoading(products, true));
      const response = await axios.get<Product[]>(`${Environment.baseUrl}/products`);

      setProducts(setData(products, response.data));
    } catch (error) {
      setProducts(setLoading(products, false, error as Error));
    }
  }, [products]);

  const state: CategoriesState = useMemo(
    () => ({ products, loadProducts }),
    [products, loadProducts]
  );

  return <StockContext.Provider value={state}>{children}</StockContext.Provider>;
};
