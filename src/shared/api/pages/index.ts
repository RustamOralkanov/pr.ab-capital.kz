import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pagesApi = createApi({
    reducerPath: "pagesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_CLIENT_URL,
    }),
    endpoints: (builder) => ({
        getPages: builder.query({
            query({ lang, slug }) {
                return {
                    url: `/pages/${slug}`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
            transformResponse: (response) => response.data,
        }),
    }),
});

export const { useGetPagesQuery } = pagesApi;
