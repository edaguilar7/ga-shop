import { Layout as AntdLayout, Badge, BadgeProps } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { HelpIcon, CartIcon, HomeIcon } from 'components/icons';
import { useContext, useEffect } from 'react';
import { CartContext } from 'context';
import { LocalStorage } from 'utils/LocalStorage';
import { AppPaths } from 'config/paths';
import './Layout.css';

const { Header, Content } = AntdLayout;

export const Layout = () => {
  const { items } = useContext(CartContext);

  const props: unknown = {
    count: items.length,
    children: <CartIcon className="cart-icon" />,
  };

  useEffect(() => {
    LocalStorage.items = items;
  }, [items]);

  return (
    <AntdLayout className="app-layout">
      <Header className="app-header">
        <Link to={AppPaths.products.path}>
          <HomeIcon className="home-icon" />
        </Link>
        <Link to={AppPaths.shoppingCart.path}>
          <Badge {...(props as BadgeProps)} />
        </Link>
        <HelpIcon className="help-icon" />
      </Header>
      <Content style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Outlet />
      </Content>
    </AntdLayout>
  );
};
