import { createAsyncThunk, createSlice , current} from "@reduxjs/toolkit";
import { editProduct, getProduct } from "../assets/JS";


const initialState = {    
    product: [],
    loading: false,
    error: {
        status: false,
        message : ''
    }
}

export const fetchProductFromDB = createAsyncThunk(
    'products/fetchProduct',
    async (productID, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await getProduct(productID);
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

export const editProductOnDB = createAsyncThunk(
    'products/editProduct',
    async (userData, { dispatch, rejectWithValue }) => {
        const { editedProduct, productID } = userData;
        try {
            const response = await editProduct(editedProduct,productID);
            if (response.success) {
                dispatch(edit(response.data));
            } else {
                return rejectWithValue(response.error)
            }  
        } catch (error) {
            console.log("err",error);
            throw  rejectWithValue(error.message)
        }
    }  
)

    
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        edit: (state, action) => {
            state.product = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductFromDB.fulfilled, (state, action) => {
            state.error = {
                status: false,
                message :""
            }
            state.loading = false;
            state.product = action.payload;
        })
        builder.addCase(fetchProductFromDB.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProductFromDB.rejected, (state,action) => {
            state.loading = false;
            state.error = {
                status: true,
                message : action.payload
            }
        })
        builder.addCase(editProductOnDB.pending, (state) => {
            state.loading = true;
        })
        
    }
});

console.log("ini fil", initialState);
export const {
    edit
} = productSlice.actions;

export default productSlice.reducer;