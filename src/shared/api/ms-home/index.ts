import type { ApiParams } from "@/shared/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Banner, MsHome } from "./types";

export const msHomeApi = createApi({
    reducerPath: "msHomeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.ab-capital.kz/api/main",
    }),
    endpoints: (builder) => ({
        getMsBanners: builder.query<Banner[], ApiParams>({
            query({ lang }) {
                return {
                    url: `/home`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
            transformResponse: (response: MsHome) => response.banners,
        }),
    }),
});

export const { useGetMsBannersQuery } = msHomeApi;
