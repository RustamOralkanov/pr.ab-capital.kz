import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_CLIENT_URL }),
    endpoints: (builder) => ({
        postLogin: builder.mutation({
            query: (data) => ({
                url: `/login`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { usePostLoginMutation } = loginApi;
