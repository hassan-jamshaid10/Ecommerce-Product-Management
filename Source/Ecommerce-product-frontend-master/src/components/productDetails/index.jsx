import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { updateProduct } from '../../features/productsSlice';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, DatePicker, Button, Row, Col } from 'antd';
import CustomButton from '../Button';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(state => state.products.products.find(product => product.id === Number(id)));
  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      console.log(product); //check
      form.setFieldsValue({
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        expiryDate: product.expiryDate ? dayjs(product.expiryDate) : null,
        image: product.image || '',
      });
    }
  }, [product, form]);

  const onFinish = (values) => {
    const formattedValues = {
      id: product.id,
      ...values,
      expiryDate: values.expiryDate ? values.expiryDate.toISOString() : null,
    };
    dispatch(updateProduct(formattedValues));
    navigate('/');
  };

  const disablePastDates = (current) => {
    return current && current.isBefore(dayjs().startOf('day'));
  };

  return (
    <Row gutter={16}>
      {/* Image Column */}
      <Col xs={24} sm={24} md={8}>
        <div style={{ textAlign: 'center' }}>
          <img
            src={product?.image || 'https://via.placeholder.com/300'}
            alt="Product"
            style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
          />
        </div>
      </Col>

      {/* Form Column */}
      <Col xs={24} sm={24} md={16}>
        <Form
          form={form}
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
            {/* <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Update Product
            </Button> */}
            <CustomButton
            type='primary'
            htmlType='submit'
            >
              Update Product
            </CustomButton>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ProductDetails;
