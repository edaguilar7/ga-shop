import React from 'react';
import { Layout as AntdLayout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content } = AntdLayout;

export const Layout = () => (
  <AntdLayout>
    <Header>Header content</Header>
    <Content>
      <Outlet />
    </Content>
  </AntdLayout>
);
