import { Form } from "antd";
import { useGetPropertiesFilterQuery, useGetPropertiesQuery } from "../api";
import { useParams } from "react-router";
import { useState } from "react";

interface PropertiesFields {
    rooms: string[];
    size: number[];
    floor: number[];
    price_per_meter: number[];
    price: number[];
}

interface PropertiesParams {
    rooms?: string[];
    min_size?: number;
    max_size?: number;
    min_floor?: number;
    max_floor?: number;
    min_price_per_meter?: number;
    max_price_per_meter?: number;
    min_price?: number;
    max_price?: number;
}

export const useProperties = () => {
    const [form] = Form.useForm();
    const [per_page, set_per_page] = useState(8);
    const [params, set_params] = useState<PropertiesParams>({} as PropertiesParams);

    const { project } = useParams();
    const { data: properties, isLoading, isFetching } = useGetPropertiesQuery({ project, per_page, ...params });
    const { data: filters, isSuccess } = useGetPropertiesFilterQuery({});

    const addProperties = () => {
        set_per_page(per_page + 8);
    };

    const onValuesChange = (_: unknown, values: PropertiesFields) => {
        set_params({
            ...values,
            min_size: values?.size?.[0],
            max_size: values?.size?.[1],
            min_floor: values?.floor?.[0],
            max_floor: values?.floor?.[1],
            min_price_per_meter: values?.price_per_meter?.[0],
            max_price_per_meter: values?.price_per_meter?.[1],
            min_price: values?.price?.[0],
            max_price: values?.price?.[1],
        });
    };

    return {
        form,
        properties,
        addProperties,
        isLoading,
        isFetching,
        filters,
        onValuesChange,
        isSuccess,
    };
};
