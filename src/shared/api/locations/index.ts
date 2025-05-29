import type { ApiParams, ApiWrapper } from "@/shared/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Location } from "./types";

export const locationsApi = createApi({
    reducerPath: "locationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_CLIENT_URL,
    }),
    endpoints: (builder) => ({
        getLocations: builder.query<Location[], ApiParams>({
            query({ lang, project, publication_type }) {
                return {
                    url: `/${publication_type}/projects/${project}/locations`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
            transformResponse: (response: ApiWrapper<Location[]>) => response.data,
        }),
    }),
});

export const { useGetLocationsQuery } = locationsApi;
