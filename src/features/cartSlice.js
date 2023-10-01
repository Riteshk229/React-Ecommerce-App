import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getCartItems } from "../assets/JS";

const initialState = {    
    cartItems: [],
    loading: true,
    error: {
        status: false,
        message: ""
    }
}

export const fetchCartItemsFromDB = createAsyncThunk(
    'carts/fetchCartItems',
    async (userId, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await getCartItems(userId);
            if (response.success) {
                return fulfillWithValue(response.data);
            } else {
                return rejectWithValue(response.error)
            }  
        } catch (error) {
            throw  rejectWithValue(error.message)
        }
    }  
)
    

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItemsFromDB.fulfilled, (state, action) => {
            state.error = {
                status: false,
                message: ""
            }
            state.loading = false;
            state.cartItems = action.payload;
        })
        builder.addCase(fetchCartItemsFromDB.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCartItemsFromDB.rejected, (state, action) => {
            state.loading = false;
            state.error = {
                status: true,
                message: action.error
            }
        })
    }
});

export const { } = cartSlice.actions;

export default cartSlice.reducer;