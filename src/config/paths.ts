export const AppPaths = {
  categories: {
    path: '/categories',
    label: 'Categories',
  },
  category: {
    path: (category: string) => `/categories/${category}`,
    label: 'Category',
  },
  product: {
    path: '/product/:id',
    label: 'Product',
  },
  shoppingCart: {
    path: '/shopping-cart',
    label: 'Shopping cart',
  },
  orderConfirmation: {
    path: '/order-confirmation',
    label: 'Order confirmation',
  },
  purchase: {
    path: '/purchase',
    label: 'Purchase',
  },
};
