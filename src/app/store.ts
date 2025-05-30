import reverseSlice from "@/entities/reverse/model/reverse.slice";
import favoriteSlice from "@/features/add-to-favorite/model/favorite-slice";
import { loginApi } from "@/pages/entry/api";
import { propertiesApi } from "@/pages/properties/api";
import { aboutApi } from "@/shared/api/about";
import { advantagesApi } from "@/shared/api/advantages";
import { carouselsApi } from "@/shared/api/carousels";
import { genplansApi } from "@/shared/api/genplans";
import { locationsApi } from "@/shared/api/locations";
import { menuApi } from "@/shared/api/menu";
import { pagesApi } from "@/shared/api/pages";
import { projectsApi } from "@/shared/api/projects";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        favorite: favoriteSlice,
        reverse: reverseSlice,
        [loginApi.reducerPath]: loginApi.reducer,
        [pagesApi.reducerPath]: pagesApi.reducer,
        [projectsApi.reducerPath]: projectsApi.reducer,
        [aboutApi.reducerPath]: aboutApi.reducer,
        [advantagesApi.reducerPath]: advantagesApi.reducer,
        [menuApi.reducerPath]: menuApi.reducer,
        [locationsApi.reducerPath]: locationsApi.reducer,
        [genplansApi.reducerPath]: genplansApi.reducer,
        [carouselsApi.reducerPath]: carouselsApi.reducer,
        [propertiesApi.reducerPath]: propertiesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            loginApi.middleware,
            pagesApi.middleware,
            projectsApi.middleware,
            aboutApi.middleware,
            advantagesApi.middleware,
            menuApi.middleware,
            locationsApi.middleware,
            genplansApi.middleware,
            carouselsApi.middleware,
            propertiesApi.middleware,
        ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
