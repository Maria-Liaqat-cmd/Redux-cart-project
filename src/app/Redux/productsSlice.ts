"use client"

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productsSlice.reducer;
