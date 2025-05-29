import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiParams, ApiWrapper } from "@/shared/types/api";
import type { Carousels, CarouselsContents } from "./types";

export const carouselsApi = createApi({
    reducerPath: "carouselsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_CLIENT_URL,
    }),
    endpoints: (builder) => ({
        getCarousels: builder.query<Carousels[], ApiParams>({
            query({ lang, publication_type, project, menu_alias }) {
                return {
                    url: `/${publication_type}/projects/${project}/menus/${menu_alias}/carousels`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
            transformResponse: (response: ApiWrapper<Carousels[]>) => response.data,
        }),
        getCarouselsContents: builder.query<CarouselsContents[], ApiParams>({
            query({ lang, publication_type, project, menu_alias }) {
                return {
                    url: `/${publication_type}/projects/${project}/menus/${menu_alias}/carousel-contents`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
            transformResponse: (response: ApiWrapper<CarouselsContents[]>) => response.data,
        }),
    }),
});

export const { useGetCarouselsQuery, useGetCarouselsContentsQuery } = carouselsApi;
