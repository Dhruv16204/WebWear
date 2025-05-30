import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    searchResults : []
}

export const getSearchResults = createAsyncThunk(
    "/search/searchResults",
    async(keyword)=>{
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/search/${keyword}`
        )

        return response.data;
    }
);

const searchSlice = createSlice({
    name: 'searchSlices',
    initialState,
    reducers:{
        resetSearchResults:(state)=>{
            state.searchResults = []
        }
    },
    extraReducers : (builder)=>{
        builder
            .addCase(getSearchResults.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(getSearchResults.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.searchResults = action.payload.data;
            })
            .addCase(getSearchResults.rejected,(state,action)=>{
                state.isLoading = false;
                state.searchResults = [];
            })
    }
});

export const {resetSearchResults} = searchSlice.actions;
export default searchSlice.reducer;