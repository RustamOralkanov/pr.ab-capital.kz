import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiParams } from "@/shared/types/api";
import type { Filters, Properties, PropertiesApi, PropertyFilters } from "../types";
import type { PropertiesByID } from "../types/properties-by-id.model";

export const propertiesApi = createApi({
    reducerPath: "propertiesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_CLIENT_URL,
    }),
    endpoints: (builder) => ({
        getProperties: builder.query<Properties, ApiParams>({
            query({ lang, project, per_page, rooms, min_size, max_size, min_floor, max_floor, min_price_per_meter, max_price_per_meter, min_price, max_price }) {
                return {
                    url: `/properties`,
                    headers: {
                        "X-Lang": lang,
                    },
                    params: {
                        project_alias: project,
                        per_page,
                        rooms,
                        min_size,
                        max_size,
                        min_floor,
                        max_floor,
                        min_price_per_meter,
                        max_price_per_meter,
                        min_price,
                        max_price,
                    },
                };
            },
            transformResponse: (response: PropertiesApi) => response.properties,
        }),
        getPropertiesById: builder.query<PropertiesByID, ApiParams>({
            query({ lang, id }) {
                return {
                    url: `/properties/${id}`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
        }),
        getPropertiesFilter: builder.query<Filters, ApiParams>({
            query({ lang }) {
                return {
                    url: `/properties-filters`,
                    headers: {
                        "X-Lang": lang,
                    },
                };
            },
            transformResponse: (response: PropertyFilters) => response.filters,
        }),
    }),
});

export const { useGetPropertiesQuery, useGetPropertiesFilterQuery, useGetPropertiesByIdQuery } = propertiesApi;
