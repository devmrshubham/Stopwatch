import { createSlice } from "@reduxjs/toolkit";

export const CartReducer = createSlice(
    {
        name: "CartReducer",
        initialState: {
            cart: []
        },
        reducers: {
            add: (state, action) => {
                state.cart.push(action.payload)
            }
        }
    }
)