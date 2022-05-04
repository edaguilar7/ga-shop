import { useContext, useEffect } from 'react';
import { shouldLoadData, hasSuccessfullyLoaded } from 'utils/state';
import { Link } from 'react-router-dom';
import { GAEvents } from 'utils/GAEvents';
import { AppPaths } from 'config/paths';
import { Product } from 'types/product';
import { StockContext } from 'context';
import { Spin, Card } from 'antd';
import './Products.css';

const Products = () => {
  const { loadProducts, products } = useContext(StockContext);

  useEffect(() => {
    if (shouldLoadData(products)) loadProducts();

    if (hasSuccessfullyLoaded(products)) {
      GAEvents.viewItemList(products.data);
    }
  }, [products]);

  if (products.isLoading) {
    return <Spin tip="Loading products..." spinning style={{ width: '100%', marginTop: '2rem' }} />;
  }

  const onViewItem = (product: Product) => GAEvents.viewItem(product);

  return (
    <div className="products-list">
      {products.data.map((product) => (
        <Link
          key={product.id}
          to={`${AppPaths.products.path}/${product.id}`}
          onClick={() => onViewItem(product)}
        >
          <Card
            key={product.id}
            hoverable
            style={{ width: 240 }}
            cover={<img alt={product.title} src={product.image} />}
          >
            <Card.Meta title={product.title} description={product.description} />
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Products;
