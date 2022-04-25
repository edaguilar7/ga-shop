import { createContext, ReactChild, useState, useCallback, useMemo } from 'react';
import { Loadable } from 'types/state';
import { Product } from 'types/product';
import { initLoadable, setData, setLoading } from 'utils/state';
import { AppEndpoints } from 'config/endpoints';
import axios from 'axios';

type CategoriesState = {
  categories: Loadable<string[]>;
  products: Loadable<Map<string, Product[]>>;
  loadCategories: () => Promise<void>;
  activeCategory: string;
  loadCategory: (categoryId: string) => Promise<void>;
};

const initialState: CategoriesState = {
  categories: initLoadable([]),
  loadCategories: () => Promise.resolve(),
  products: initLoadable(new Map()),
  loadCategory: () => Promise.resolve(),
  activeCategory: '',
};

export const StockContext = createContext<CategoriesState>(initialState);

export const StockProvider = ({ children }: { children: ReactChild }) => {
  const [categories, setCategories] = useState(initialState.categories);
  const [products, setProducts] = useState(initialState.products);
  const [activeCategory, setActiveCategory] = useState('');

  const loadCategories = useCallback(async () => {
    try {
      setCategories(setLoading(categories, true));
      const response = await axios.get<string[]>(AppEndpoints.allCategories);

      const mergedCategories = ['all'].concat(response.data);
      setCategories(setData(categories, mergedCategories));
    } catch (error) {
      setCategories(setLoading(categories, false, error as Error));
    }
  }, [categories]);

  const loadCategory = useCallback(
    async (categoryId: string) => {
      try {
        setActiveCategory(categoryId);
        setProducts(setLoading(products, true));
        const response = await axios.get<Product[]>('');

        const productsClone = setLoading(products, false);
        productsClone.data.set(categoryId, response.data);

        setProducts(productsClone);
      } catch (error) {
        setProducts(setLoading(products, false, error as Error));
      }
    },
    [products]
  );

  const state: CategoriesState = useMemo(
    () => ({ categories, loadCategories, products, activeCategory, loadCategory }),
    [categories, loadCategories, loadCategory, activeCategory, products]
  );

  return <StockContext.Provider value={state}>{children}</StockContext.Provider>;
};
