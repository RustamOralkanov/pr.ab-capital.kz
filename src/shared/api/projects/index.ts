import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Projects } from "./types";
import type { ApiParams } from "@/shared/types/api";

export const projectsApi = createApi({
    reducerPath: "projectsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_CLIENT_URL,
    }),
    endpoints: (builder) => ({
        getProjects: builder.query<Projects[], ApiParams>({
            query({ lang }) {
                return {
                    url: `/projects`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
        }),
    }),
});

export const { useGetProjectsQuery } = projectsApi;
