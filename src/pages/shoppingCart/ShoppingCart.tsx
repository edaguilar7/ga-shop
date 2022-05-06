import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppPaths } from 'config/paths';
import { CartContext } from 'context';
import { TrashIcon } from 'components/icons';
import { List, Avatar, Button, Empty } from 'antd';
import { GAEvents } from 'utils/GAEvents';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const { items, removeItem, clear } = useContext(CartContext);

  const cartIsEmpty = items.length === 0;
  return (
    <div className="shopping-cart">
      {!cartIsEmpty && (
        <Button className="shopping-cart-clear-cart" onClick={clear}>
          Clear cart
        </Button>
      )}
      {cartIsEmpty ? (
        <Empty description="No items added yet">
          <Button type="primary">
            <Link to={AppPaths.products.path}>Go to products list</Link>
          </Button>
        </Empty>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={items}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  danger
                  className="shopping-cart-remove-item-button"
                  onClick={() => removeItem(item)}
                >
                  <TrashIcon />
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={<Link to={`${AppPaths.products.path}/${item.id}`}>{item.title}</Link>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      )}
      {!cartIsEmpty && (
        <Button disabled={cartIsEmpty} className="shopping-cart-proceed-button" type="primary">
          <Link onClick={() => GAEvents.beginCheckout(items)} to={AppPaths.orderConfirmation.path}>
            Proceed to payment
          </Link>
        </Button>
      )}
    </div>
  );
};

export default ShoppingCart;
