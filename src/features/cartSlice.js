import { createSlice,createAsyncThunk, current } from "@reduxjs/toolkit";
import { getCartItems, getProduct } from "../assets/JS";

const initialState = {    
    cartItems: [],
    products:[],
    loading: false,
    error: {
        status: false,
        message: ""
    },
}

export const fetchCartItemsOfUser = createAsyncThunk(
    'carts/fetchCartItems',
    async (userId, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await getCartItems(userId);
            if (response.success) {
                return fulfillWithValue(response.data[0]);
            } else {
                return rejectWithValue(response.error)
            }  
        } catch (error) {
            throw  rejectWithValue(error.message)
        }
    }  
)

export const fetchProductsInCart = createAsyncThunk(
    'carts/fetchProductsIncart',
    async (productID, { rejectWithValue,getState }) => {
        try {
            const cart = getState().cart.cartItems;
            const products = getState().products.list;
            const productinfo = cart.products;
            const productList = productinfo.map((inCart,index) => {
                const product = products.filter((product) => product.id === inCart.productId);
                return {
                    product: {
                        id: index,
                        price: product[0].price,
                        title: product[0].title,
                        image: product[0].image
                    },
                    quantity: inCart.quantity
                }
            });
            console.log("fetc",productList)
            return productList;
        } catch (error) {
            throw  rejectWithValue(error.message)
        }
    }  
)

export const addItemIncart = createAsyncThunk(
    'carts/addItemIncart',
    async (userData, {getState}) => {
        try {
            const products = getState().products.list;
            const product = products.filter((product) => product.id === inCart.productId);
            return {
                product: product,
                quantity: inCart.quantity
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
        increaseQuantity: (state,action) => {
            state.products = state.products.map((product) => {
                if (action.payload === product.product.id) {
                    return product.product.quantity + 1;
                }
                return product;
            })
        },
        deccreaseQuantity: (state,action) => {
            state.products = state.products.map((product) => {
                if (action.payload === product.product.id) {
                    if (product.quantity > 0) {
                        product.quantity = -1
                    }
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItemsOfUser.fulfilled, (state, action) => {
            state.error = {
                status: false,
                message: ""
            }
            state.loading = false;
            state.cartItems = action.payload;;
        })
        builder.addCase(fetchCartItemsOfUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCartItemsOfUser.rejected, (state, action) => {
            state.loading = false;
            state.error = {
                status: true,
                message: action.error
            }
        })
        builder.addCase(fetchProductsInCart.fulfilled, (state, action) => {
            state.error = {
                status: false,
                message: ""
            }
            state.loading = false;
            console.log("ac pay",action.payload);
            state.products = action.payload;
        })
        builder.addCase(fetchProductsInCart.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProductsInCart.rejected, (state, action) => {
            state.loading = false;
            state.error = {
                status: true,
                message: action.error
            }
        })
        builder.addCase(addItemIncart.fulfilled, (state, action) => {
            state.error = {
                status: false,
                message: ""
            }
            state.loading = false;
            console.log(current(state));
            state.products = [...state.products,action.payload];
            console.log(current(state));
        })
        builder.addCase(addItemIncart.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addItemIncart.rejected, (state, action) => {
            state.loading = false;
            state.error = {
                status: true,
                message: action.error
            }
        })
    }
});

export const { deccreaseQuantity, increaseQuantity} = cartSlice.actions;

export default cartSlice.reducer;