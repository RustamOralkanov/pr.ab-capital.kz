import type { ApiParams, ApiWrapper } from "@/shared/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Genplans } from "./types";

export const genplansApi = createApi({
    reducerPath: "genplansApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_CLIENT_URL,
    }),
    endpoints: (builder) => ({
        getGenplans: builder.query<Genplans[], ApiParams>({
            query({ lang, project, publication_type }) {
                return {
                    url: `/${publication_type}/projects/${project}/genplans`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
            transformResponse: (response: ApiWrapper<Genplans[]>) => response.data,
        }),
    }),
});

export const { useGetGenplansQuery } = genplansApi;
