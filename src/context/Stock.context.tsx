import { createContext, ReactChild, useState, useCallback, useMemo } from 'react';
import { Loadable } from 'types/state';
import { Product } from 'types/product';
import { initLoadable, setData, setLoading } from 'utils/state';
import { Environment } from 'utils/Environment';
import axios from 'axios';

type CategoriesState = {
  products: Loadable<Product[]>;
  loadProducts: () => Promise<void>;
  activeProduct: Loadable<Product>;
  loadProductById: (productId: number) => Promise<void>;
  resetActiveProduct: () => void;
};

const initialState: CategoriesState = {
  products: initLoadable([]),
  loadProducts: () => Promise.resolve(),
  activeProduct: initLoadable({
    category: '',
    description: '',
    id: -1,
    image: '',
    price: 0,
    rating: {
      count: 0,
      rate: 0,
    },
    title: '',
  }),
  loadProductById: () => Promise.resolve(),
  resetActiveProduct: () => undefined,
};

export const StockContext = createContext<CategoriesState>(initialState);

export const StockProvider = ({ children }: { children: ReactChild }) => {
  const [products, setProducts] = useState(initialState.products);
  const [activeProduct, setActiveProduct] = useState(initialState.activeProduct);

  const loadProducts = useCallback(async () => {
    try {
      setProducts(setLoading(products, true));
      const response = await axios.get<Product[]>(`${Environment.baseUrl}/products?limit=5`);

      setProducts(setData(products, response.data));
    } catch (error) {
      setProducts(setLoading(products, false, error as Error));
    }
  }, [products]);

  const loadProductById = useCallback(
    async (productId: number) => {
      try {
        setActiveProduct(setLoading(activeProduct, true));
        const response = await axios.get<Product>(`${Environment.baseUrl}/products/${productId}`);

        setActiveProduct(setData(activeProduct, response.data));
      } catch (error) {
        setActiveProduct(setLoading(activeProduct, false, error as Error));
      }
    },
    [activeProduct]
  );

  const resetActiveProduct = useCallback(() => {
    setActiveProduct(initialState.activeProduct);
  }, [setActiveProduct]);

  const state: CategoriesState = useMemo(
    () => ({
      products,
      loadProducts,
      activeProduct,
      loadProductById,
      resetActiveProduct,
    }),
    [products, loadProducts, activeProduct, loadProductById, resetActiveProduct]
  );

  return <StockContext.Provider value={state}>{children}</StockContext.Provider>;
};
