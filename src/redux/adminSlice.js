// src/redux/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "adminAuth",
    initialState: {
        admin: null,          
    },
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;
        },
        clearAdmin: (state) => {
            state.admin = null;
        },
    }
});

export const { setAdmin, clearAdmin } = adminSlice.actions;

export default adminSlice.reducer;
