import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiParams, ApiWrapper } from "@/shared/types/api";
import type { Advantages } from "./types";

export const advantagesApi = createApi({
    reducerPath: "advantagesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_CLIENT_URL,
    }),
    endpoints: (builder) => ({
        getAdvantages: builder.query<Advantages[], ApiParams>({
            query({ lang, publication_type, project }) {
                return {
                    url: `/${publication_type}/projects/${project}/advantages`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
            transformResponse: (response: ApiWrapper<Advantages[]>) => response.data,
        }),
    }),
});

export const { useGetAdvantagesQuery } = advantagesApi;
