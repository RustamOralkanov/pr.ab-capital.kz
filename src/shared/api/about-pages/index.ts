import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiParams, ApiWrapper } from "@/shared/types/api";
import type { AboutPages, AboutPagesSections } from "./types";

export const aboutPagesApi = createApi({
    reducerPath: "aboutPagesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_CLIENT_URL,
    }),
    endpoints: (builder) => ({
        getAboutPages: builder.query<AboutPages[], ApiParams>({
            query({ lang }) {
                return {
                    url: `/about-pages`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
            transformResponse: (response: ApiWrapper<AboutPages[]>) => response.data,
        }),
        getAboutPagesById: builder.query<AboutPages, ApiParams>({
            query({ lang, alias }) {
                return {
                    url: `/about-pages/${alias}`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
            transformResponse: (response: ApiWrapper<AboutPages>) => response.data,
        }),
        getAboutPagesSections: builder.query<AboutPagesSections[], ApiParams>({
            query({ lang, id }) {
                return {
                    url: `/about-sections/${id}`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
            transformResponse: (response: ApiWrapper<AboutPagesSections[]>) => response.data,
        }),
    }),
});

export const { useGetAboutPagesQuery, useGetAboutPagesByIdQuery, useGetAboutPagesSectionsQuery } = aboutPagesApi;
