import { Environment } from 'utils/Environment';
import { Product } from 'types/product';

const concatBaseUrl = (path: string) => `${Environment.baseUrl}${path}`;

export const AppEndpoints = {
  allCategories: concatBaseUrl('/products/categories'),
  allProducts: () => concatBaseUrl('/products'),
  productsByCategory: (category: string) => concatBaseUrl(`/products/category/${category}`),
  productById: (product: Product) => concatBaseUrl(`/products/${product.id}`),
};
