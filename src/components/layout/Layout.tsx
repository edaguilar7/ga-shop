import { Layout as AntdLayout } from 'antd';
import { Outlet } from 'react-router-dom';
import { HelpIcon, CartIcon } from 'components/icons';
import './Layout.css';

const { Header, Content } = AntdLayout;

export const Layout = () => (
  <AntdLayout className="app-layout">
    <Header className="app-header">
      <HelpIcon className="help-icon" />
      <CartIcon className="cart-icon" />
    </Header>
    <Content style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Outlet />
    </Content>
  </AntdLayout>
);
