import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu, Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { logout } from '../../features/authSlice.js'; // Import the logout action from your authSlice
import productLogo from '../../assets/productLogo.png';

const { Header } = Layout;

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser); // Access loggedInUser from authSlice

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  const menuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: <a onClick={handleLogout}>Logout</a>,
    },
  ];

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '0 16px' }}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={productLogo} alt="Logo" style={{ marginRight: 8 }} />
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>ProductCRUD</span>
      </div>
      {loggedInUser && (
        <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']}>
          <Space>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <span>{loggedInUser.username}</span>
          </Space>
        </Dropdown>
      )}
    </Header>
  );
};

export default HeaderComponent;
