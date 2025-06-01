import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface InitialState {
    publicationType: "main" | "commerce";
}

const storedPublicationType = localStorage.getItem("publicationType");

const isValidType = (value: string | null): value is "main" | "commerce" => value === "main" || value === "commerce";

const initialState: InitialState = {
    publicationType: isValidType(storedPublicationType) ? storedPublicationType : "main",
};

export const publicationTypeSlice = createSlice({
    name: "publicationType",
    initialState,
    reducers: {
        setPublicationType: (state, action: PayloadAction<"main" | "commerce">) => {
            state.publicationType = action.payload;
            localStorage.setItem("publicationType", action.payload);
        },
    },
});

export const { setPublicationType } = publicationTypeSlice.actions;
export default publicationTypeSlice.reducer;
