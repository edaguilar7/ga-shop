import { useEffect, useContext } from 'react';
import { Spin, Table, Rate, Button } from 'antd';
import { Product as ProductType } from 'types/product';
import { GAEvents } from 'utils/GAEvents';
import { ColumnsType } from 'antd/lib/table';
import { CartIcon } from 'components/icons';
import { StockContext, CartContext } from 'context';
import { useParams } from 'react-router-dom';
import { shouldLoadData } from 'utils/state';
import './Product.css';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { activeProduct, loadProductById, resetActiveProduct } = useContext(StockContext);
  const { addItem, removeItem, checkItemAlreadyInCart } = useContext(CartContext);

  useEffect(() => {
    if (Number(id) !== activeProduct.data.id) {
      resetActiveProduct();
    }
  }, [resetActiveProduct, id, activeProduct.data.id]);

  useEffect(() => {
    if (shouldLoadData(activeProduct)) {
      loadProductById(Number(id));
    }
  }, [activeProduct, loadProductById, id]);

  if (activeProduct.isLoading) {
    return <Spin tip="Loading product..." style={{ width: '100%', marginTop: '2rem' }} spinning />;
  }

  const getTooltips = (rate: number): string[] => {
    const tooltips = Array(5).fill('');
    const rateInt = Math.round(rate);
    tooltips[rateInt - 1] = rate.toFixed(2);
    return tooltips;
  };

  const columns: ColumnsType<ProductType> = [
    {
      title: 'Category',
      align: 'center',
      dataIndex: 'category',
    },
    {
      title: 'Price',
      align: 'center',
      dataIndex: 'price',
      render: (value) => `$${value}`,
    },
    {
      title: 'Rating count',
      align: 'center',
      dataIndex: 'rating',
      render: (_value, record) => record.rating.count,
    },
    {
      title: 'Rating stars',
      align: 'center',
      dataIndex: 'rating',
      render: (_value, record) => (
        <Rate
          value={record.rating.rate}
          disabled
          allowHalf
          tooltips={getTooltips(record.rating.rate)}
        />
      ),
    },
  ];

  const handleAddItem = (product: ProductType) => {
    addItem(product);
    GAEvents.addToCart(product);
  };

  const handleRemoveItem = (product: ProductType) => {
    removeItem(product);
    GAEvents.removeFromCart(product);
  };

  return (
    <div className="product-detail">
      <span className="product-detail-image-container">
        <img src={activeProduct.data.image} alt={activeProduct.data.title} />
      </span>
      <span className="product-detail-meta-container">
        <h1>{activeProduct.data.title}</h1>
        <p>{activeProduct.data.description}</p>

        {checkItemAlreadyInCart(activeProduct.data) ? (
          <Button
            onClick={() => handleRemoveItem(activeProduct.data)}
            className="remove-from-cart-button"
            type="primary"
            danger
          >
            <CartIcon />
            Remove from cart
          </Button>
        ) : (
          <Button
            onClick={() => handleAddItem(activeProduct.data)}
            className="add-to-cart-button"
            type="primary"
          >
            <CartIcon />
            Add to cart
          </Button>
        )}

        <Table
          pagination={false}
          columns={columns}
          dataSource={[activeProduct.data]}
          scroll={{ x: 500 }}
        />
      </span>
    </div>
  );
};

export default Product;
