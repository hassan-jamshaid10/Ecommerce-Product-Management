// components/CustomButton.jsx
import React from 'react';
import { Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CustomButton = ({ type = 'default', iconType, onClick, children, style ,htmlType }) => {
  // Define icons based on the type prop
  const icons = {
    add: <PlusOutlined />,
    edit: <EditOutlined />,
    delete: <DeleteOutlined />,
  };

  return (
    <Button
      type={type}
      htmlType={htmlType}
      icon={icons[iconType]}
      onClick={onClick}
      style={style}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
