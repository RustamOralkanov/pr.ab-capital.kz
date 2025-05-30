import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface InitialState {
    reverse: boolean;
}

const initialState: InitialState = {
    reverse: false,
};

export const reverseSlice = createSlice({
    name: "reverse",
    initialState,
    reducers: {
        handleReverse: (state, action: PayloadAction<boolean>) => {
            state.reverse = action.payload;
            localStorage.setItem("reverse", `${action.payload}`);
        },
    },
});

export const { handleReverse } = reverseSlice.actions;
export default reverseSlice.reducer;
