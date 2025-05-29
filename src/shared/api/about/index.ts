import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiParams, ApiWrapper } from "@/shared/types/api";
import type { About, AboutSections } from "./types";

export const aboutApi = createApi({
    reducerPath: "aboutApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_CLIENT_URL,
    }),
    endpoints: (builder) => ({
        getAbout: builder.query<About, ApiParams>({
            query({ lang, publication_type, project }) {
                return {
                    url: `/${publication_type}/projects/${project}/about`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
            transformResponse: (response: ApiWrapper<About>) => response.data,
        }),
        getAboutSections: builder.query<AboutSections[], ApiParams>({
            query({ lang, publication_type, project }) {
                return {
                    url: `/${publication_type}/projects/${project}/about-sections`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
            transformResponse: (response: ApiWrapper<AboutSections[]>) => response.data,
        }),
    }),
});

export const { useGetAboutQuery, useGetAboutSectionsQuery } = aboutApi;
