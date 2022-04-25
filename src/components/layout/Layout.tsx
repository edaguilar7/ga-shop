import { Layout as AntdLayout } from 'antd';
import { Outlet } from 'react-router-dom';
import { HelpIcon, CartIcon } from 'components/icons';
import { HeaderMenu } from './HeaderMenu';
import './Layout.css';

const { Header, Content } = AntdLayout;

export const Layout = () => (
  <AntdLayout className="app-layout">
    <Header>
      <div className="logo">
        <HelpIcon className="help-icon" />
        <CartIcon className="cart-icon" />
      </div>
      <HeaderMenu />
    </Header>
    <Content style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Outlet />
    </Content>
  </AntdLayout>
);
