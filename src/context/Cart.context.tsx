import { createContext, useState, ReactChild, useCallback, useMemo } from 'react';
import { Product } from 'types/product';

type CartState = {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: Product) => void;
  clear: () => void;
};

const initialState: CartState = {
  addItem: () => undefined,
  clear: () => undefined,
  items: [],
  removeItem: () => undefined,
};

const CartContext = createContext(initialState);

export const CartProvider = ({ children }: { children: ReactChild }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addItem = useCallback(
    (product: Product) => {
      const itemsClone = [...items];
      itemsClone.push(product);
      setItems(itemsClone);
    },
    [items]
  );

  const removeItem = useCallback(
    (product: Product) => {
      const remainingItems = items.filter((item) => item.id !== product.id);
      setItems(remainingItems);
    },
    [items]
  );

  const clear = () => setItems([]);

  const state: CartState = useMemo(
    () => ({ addItem, clear, items, removeItem }),
    [addItem, items, removeItem]
  );

  return <CartContext.Provider value={state}>{children}</CartContext.Provider>;
};
