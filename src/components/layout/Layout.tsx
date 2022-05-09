import { Layout as AntdLayout, Badge, BadgeProps } from 'antd';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { HelpIcon, CartIcon, HomeIcon } from 'components/icons';
import { useContext, useEffect } from 'react';
import ReactGA from 'react-ga4';
import ReactGTM from 'react-gtm-module';
import { CartContext } from 'context';
import { LocalStorage } from 'utils/LocalStorage';
import { AppPaths } from 'config/paths';
import { Environment } from 'utils/Environment';
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

  useEffect(() => {
    ReactGA.initialize([
      {
        trackingId: Environment.gaTrackingId,
      },
    ]);
    ReactGTM.initialize({
      gtmId: Environment.gtmTrackingId,
    });
  }, []);

  return (
    <AntdLayout className="app-layout">
      <Header className="app-header">
        <Link to={AppPaths.products.path}>
          <HomeIcon className="home-icon" />
        </Link>
        <Link to={AppPaths.shoppingCart.path} onClick={GAEvents.viewCart}>
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
