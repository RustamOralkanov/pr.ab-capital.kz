import type { ApiParams, ApiWrapper } from "@/shared/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Menu } from "./types";

export const menuApi = createApi({
    reducerPath: "menuApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_CLIENT_URL,
    }),
    endpoints: (builder) => ({
        getMenu: builder.query<Menu[], ApiParams>({
            query({ lang, project, publication_type }) {
                return {
                    url: `/${publication_type}/projects/${project}/menus`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
            transformResponse: (response: ApiWrapper<Menu[]>) => response.data,
        }),
    }),
});

export const { useGetMenuQuery } = menuApi;
