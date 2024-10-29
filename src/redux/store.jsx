import { configureStore } from "@reduxjs/toolkit";
import sliceProducts from "./sliceProducts";

export const store = configureStore({
    reducer: {
        sliceProducts: sliceProducts
    }
})



