import { createSlice } from "@reduxjs/toolkit";

export const sliceProducts = createSlice({
    name: 'sliceProducts',
    initialState: {
        products: [],
        cart: []
    },
    reducers: {
        fetchProducts: (state, action) => {
            state.products = action.payload
        },
        addToCart: (state, action) => {
            state.cart.push(action.payload)
        },
        deleteFromCart: (state, action) => {
            state.cart = state.cart.filter((el, index) => index !== action.payload)
        },
        clearCart: (state, action) => {
            state.cart = []
        }
    }
})
export const { clearCart, addToCart, fetchProducts, deleteFromCart } = sliceProducts.actions
export default sliceProducts.reducer