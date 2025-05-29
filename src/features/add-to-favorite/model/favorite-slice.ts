import type { Daum } from "@/pages/properties/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    properties: Daum[];
}

const storedFavorites = localStorage.getItem("favorites");

const initialState: IInitialState = {
    properties: storedFavorites ? JSON.parse(storedFavorites) : [],
};

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        addToFavorite: (state, action: PayloadAction<Daum>) => {
            const index = state.properties.findIndex((flat) => flat.id === action.payload.id);
            const properties = state.properties;

            if (index !== -1) {
                properties.splice(index, 1);
            } else {
                properties.push(action.payload);
            }

            localStorage.setItem("favorites", JSON.stringify(properties));
        },
        clearFavorites: (state) => {
            state.properties = [];
        },
    },
});

export const { addToFavorite, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
