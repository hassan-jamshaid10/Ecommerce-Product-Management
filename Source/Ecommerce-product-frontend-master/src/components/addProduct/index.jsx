import React from 'react';
import { Form, Input, InputNumber, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createProduct } from '../../features/productsSlice';
import CustomButton from '../Button';
import dayjs from 'dayjs'; 

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      expiryDate: values.expiryDate ? values.expiryDate.toISOString() : null,
    };
    dispatch(createProduct(formattedValues));
    console.log('hehe');
    console.log('hehe');
    navigate('/');
  };

  // Function to disable past dates
  const disablePastDates = (current) => {
    return current && current.isBefore(dayjs().startOf('day'));
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="Product Name"
        name="title"
        rules={[{ required: true, message: 'Please input the product name!' }]}
      >
        <Input placeholder="Enter product name" />
      </Form.Item>

      <Form.Item
        label="Price (RS)"
        name="price"
        rules={[{ required: true, message: 'Please input the product price!' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          prefix="RS"
          placeholder="Enter product price"
        />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: 'Please input the product quantity!' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          placeholder="Enter product quantity"
        />
      </Form.Item>

      <Form.Item
        label="Expiry Date"
        name="expiryDate"
      >
        <DatePicker
          style={{ width: '100%' }}
          placeholder="Select expiry date (optional)"
          disabledDate={disablePastDates}
          format="YYYY-MM-DD" 
        />
      </Form.Item>

      <Form.Item
        label="Product Image URL"
        name="image"
        rules={[{ required: true, message: 'Please input the product image URL!' }]}
      >
        <Input placeholder="Enter product image URL" />
      </Form.Item>

      <Form.Item>
      <CustomButton
        type="primary"
        iconType="add"
        htmlType="submit"  // Ensure the button submits the form
        style={{ backgroundColor: '#52c41a' }} 
      >
        Add Product
      </CustomButton>
      </Form.Item>
    </Form>
  );
};

export default AddProduct;
