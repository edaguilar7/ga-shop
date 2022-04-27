import { createContext, useState, ReactChild, useCallback, useMemo } from 'react';
import { Product } from 'types/product';
import { LocalStorage } from 'utils/LocalStorage';

type CartState = {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: Product) => void;
  checkItemAlreadyInCart: (product: Product) => boolean;
  clear: () => void;
};

const initialState: CartState = {
  addItem: () => undefined,
  clear: () => undefined,
  checkItemAlreadyInCart: () => false,
  items: [],
  removeItem: () => undefined,
};

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }: { children: ReactChild }) => {
  const [items, setItems] = useState<Product[]>(LocalStorage.items);

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

  const checkItemAlreadyInCart = useCallback(
    (product: Product) => {
      const foundItem = items.find((item) => item.id === product.id);
      return Boolean(foundItem);
    },
    [items]
  );

  const clear = () => setItems([]);

  const state: CartState = useMemo(
    () => ({ addItem, clear, items, removeItem, checkItemAlreadyInCart }),
    [addItem, items, removeItem, checkItemAlreadyInCart]
  );

  return <CartContext.Provider value={state}>{children}</CartContext.Provider>;
};
