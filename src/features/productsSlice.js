import { createAsyncThunk, createSlice , current} from "@reduxjs/toolkit";
import { addNewProduct, delProduct, getProducts,getProduct } from "../assets/JS";

const initialState = {    
    list: [],
    productOnFocus : {},
    loading: false,
    error: {
        status: false,
        message : ''
    }
}


export const fetchProductsFromDB = createAsyncThunk(
    'products/fetchProducts',
    async (userData, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await getProducts();
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


export const addProductToDB = createAsyncThunk(
    'products/addProduct',
    async (newProduct, { dispatch, rejectWithValue }) => {
        try {
            const response = await addNewProduct(newProduct);
            if (response.success) {
                dispatch(addProduct(response.data));
            }
            else {
                return rejectWithValue(response.error)
            }
        } catch (error) {
            throw rejectWithValue(error.message)
        }
    }
);

export const deleteProductInDB = createAsyncThunk(
    'products/deleteProduct',
    async (productID, { dispatch, rejectWithValue }) => {
        try {
            if (productID <= 20) {
                dispatch(deleteProduct);
            }
            else {
                const response = await delProduct(productID);
                if (response.success) {
                    dispatch(deleteProduct(productID));
                }
                else {
                    return rejectWithValue(response.error);
                }      
            }
        } catch (error) {
            throw rejectWithValue(error.message);
        }
    }
);
    
export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchSingleProduct: (state, action) => {
            state.productOnFocus = state.list.filter(product => product.id === action.payload);
        },
        resetState:  (state) => {
            state.list.sort((a, b) => a.id - b.id);
        },
        sortByPrice:(state, action) => {
            if (action.payload === 'asc') {
                state.list.sort((a, b) => a.price - b.price);

            }
            
            if (action.payload === 'desc') {
                state.list.sort((a, b) => b.price - a.price);
            }
        },
        deleteProduct: (state, action) => { 
            state.list = state.list.filter((product) => product.id !== action.payload)
        },
        addProduct: (state, action) => {
            state.list = [action.payload, ...state.list];
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsFromDB.fulfilled, (state, action) => {
            state.error = {
                status: false,
                message :""
            }
            state.loading = false;
            state.list = action.payload;
        })
        builder.addCase(fetchProductsFromDB.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProductsFromDB.rejected, (state,action) => {
            state.loading = false;
            state.error = {
                status: true,
                message : action.error
            }
        })
        builder.addCase(addProductToDB.fulfilled, (state) => {
            state.loading = false;
            state.error = {
                status: false,
                message: ""
            };
        })
        builder.addCase(addProductToDB.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addProductToDB.rejected, (state,action) => {
            state.loading = false;
            state.error = {
                status: true,
                message: action.error
            };
        })
        
    }
});

console.log("ini fil", initialState);
export const {
    deleteProduct,
    sortByPrice,
    resetState,
    addProduct,
    fetchSingleProduct
} = productsSlice.actions;

export default productsSlice.reducer;