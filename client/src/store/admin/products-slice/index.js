import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    productList : []
}

//add new product
export const addNewProduct = createAsyncThunk(
    '/products/addnewproduct',
    async (formData)=> {
        const result = await axios.post( `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
        formData ,
        {
            headers : {"Content-Type" : "application/json"} ,
        }
        );

        return result?.data;
    }
);

//fetch all products
export const fetchAllProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/products/get`
      );
  
      return result?.data;
    }
);

//edit product
export const editProduct = createAsyncThunk(
    "/products/editProduct",
    async ({ id, formData }) => {
      const result = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return result?.data;
    }
);

//delete product
export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
    async (id) => {
      const result = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`
      );
  
      return result?.data;
    }
);
  


const AdminProductSlice = createSlice({
    name: 'adminProducts',
    initialState ,
    reducers : {} ,
    extraReducers : (builder) => {
        builder
        .addCase(fetchAllProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload.data;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.productList = [];
        });
    }
})

export default AdminProductSlice.reducer;