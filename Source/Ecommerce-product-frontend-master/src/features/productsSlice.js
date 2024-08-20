// import { createSlice } from '@reduxjs/toolkit';

// //converted to ISO String to make it serializable
// const initialState = { 
//     products: [
//         {id: 1 , name: "clock", price: 1200.00, quantity: 6000, expiryDate: new Date(2025, 5, 15).toISOString(), image: "https://plus.unsplash.com/premium_photo-1682125784386-d6571f1ac86a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvY2tzfGVufDB8fDB8fHww"},
//     ]
// };

// export const productsSlice = createSlice({
//     name: 'products',
//     initialState,
//     reducers: {
//         createProduct: (state, action) => {
//             const { name, price, quantity, expiryDate, image } = action.payload;

//             const newProduct = {
//                 id: Date.now(),  
//                 name,
//                 price,
//                 quantity,
//                 expiryDate: expiryDate ? new Date(expiryDate).toISOString() : null,  
//                 image, 
//             };
//             state.products.push(newProduct);
//         },

//         updateProduct: (state, action) => {
//             const { id, name, price, quantity, expiryDate, image } = action.payload;
//             const product = state.products.find(product => product.id === Number(id));
//             if (product) {
//                 product.name = name;
//                 product.price = price;
//                 product.quantity = quantity;
//                 product.expiryDate = expiryDate ? new Date(expiryDate).toISOString() : null;
//                 product.image = image;
//             }
//         },

//         deleteProduct: (state, action) => {
//             const { id } = action.payload;
//             state.products = state.products.filter(product => product.id !== Number(id));
//         }
//     }
// });

// export const {createProduct , updateProduct, deleteProduct} = productsSlice.actions;
// export default productsSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const API_URL = 'https://fakestoreapi.com/products';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// Async thunk to create a product
export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
});

// Async thunk to update a product
export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
    const { id, ...updateData } = product;
    const response = await axios.put(`${API_URL}/${id}`, updateData);
    return response.data;
});

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});


const initialState = {
    products: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Create product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })

            // Update product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const { id } = action.payload;
                const existingProduct = state.products.find(product => product.id === id);
                if (existingProduct) {
                    Object.assign(existingProduct, action.payload);
                }
            })

            // Delete product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product.id !== action.payload);
            });
    }
});

export default productsSlice.reducer;

