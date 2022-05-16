import { Layout as AntdLayout, Badge, BadgeProps, Tooltip } from 'antd';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { HelpIcon, CartIcon, HomeIcon } from 'components/icons';
import { useContext, useEffect } from 'react';
import { CartContext } from 'context';
import { LocalStorage } from 'utils/LocalStorage';
import { AppPaths } from 'config/paths';
import { GAEvents } from 'utils/GAEvents';
import './Layout.css';

const { Header, Content } = AntdLayout;

export const Layout = () => {
  const { items } = useContext(CartContext);
  const { pathname } = useLocation();

  const props: unknown = {
    count: items.length,
    children: <CartIcon className="cart-icon" />,
  };

  useEffect(() => {
    LocalStorage.items = items;
  }, [items]);

  const getPageTitle = (path: string) => {
    const dynamicRouteRegex = /\d$/;
    const url = dynamicRouteRegex.test(path) ? path.replace(dynamicRouteRegex, ':id') : path;
    let pageTitle = 'Not found';

    const pathsKeys = Object.keys(AppPaths) as (keyof typeof AppPaths)[];

    pathsKeys.forEach((key) => {
      if (AppPaths[key].path === url) {
        pageTitle = AppPaths[key].label;
      }
    });

    return pageTitle;
  };

  useEffect(() => {
    document.title = getPageTitle(pathname);
  }, [pathname]);

  return (
    <AntdLayout className="app-layout">
      <Header className="app-header">
        <Link to={AppPaths.products.path}>
          <HomeIcon className="home-icon" />
        </Link>
        <Link to={AppPaths.shoppingCart.path} onClick={GAEvents.viewCart}>
          <Badge {...(props as BadgeProps)} />
        </Link>
        <Tooltip title="Buy what you want, not what you need..." trigger={['click']}>
          <HelpIcon className="help-icon" role="button" />
        </Tooltip>
      </Header>
      <Content style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Outlet />
      </Content>
    </AntdLayout>
  );
};
