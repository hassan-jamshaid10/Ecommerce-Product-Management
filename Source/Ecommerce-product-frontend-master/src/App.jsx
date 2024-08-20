import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './components/loginPage';
import ViewProducts from './components/viewProducts';
import ProductDetails from './components/productDetails';
import AddProduct from './components/addProduct';
import LayoutComponent from '../src/layouts/AppLayout';

const ProtectedRoute = ({ element }) => {
  const loggedInUser = useSelector(state => state.auth.loggedInUser);
  return loggedInUser ? <LayoutComponent>{element}</LayoutComponent> : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute element={<ViewProducts />} />,
  },
  {
    path: '/manage-products/:id',
    element: <ProtectedRoute element={<ProductDetails />} />,
  },
  {
    path: '/manage-products/new',
    element: <ProtectedRoute element={<AddProduct />} />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
