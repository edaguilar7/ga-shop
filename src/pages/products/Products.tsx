import { useContext, useEffect } from 'react';
import { shouldLoadData } from 'utils/state';
import { Link } from 'react-router-dom';
import { AppPaths } from 'config/paths';
import { StockContext } from 'context';
import { Spin, Card } from 'antd';
import './Products.css';

const Products = () => {
  const { loadProducts, products } = useContext(StockContext);

  useEffect(() => {
    if (shouldLoadData(products)) loadProducts();
  }, [products]);

  if (products.isLoading) {
    return <Spin tip="Loading products..." spinning style={{ width: '100%', marginTop: '2rem' }} />;
  }

  return (
    <div className="products-list">
      {products.data.map((product) => (
        <Link key={product.id} to={`${AppPaths.products.path}/${product.id}`}>
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
