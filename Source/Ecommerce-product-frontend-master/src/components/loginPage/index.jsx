import React from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import {login} from '../../features/authSlice'
import { useNavigate } from 'react-router';
import CustomButton from '../Button';


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    // console.log('Success:', values); Extra check
    dispatch(login(values));
    navigate('/');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex justify-center bg-purple-500 items-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            {/* <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button> */}
            <CustomButton
              type='primary'
              htmlType="submit">
                Login
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
