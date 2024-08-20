import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from '../components/header';

const { Content } = Layout;

const AppLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderComponent />
      <Layout>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
