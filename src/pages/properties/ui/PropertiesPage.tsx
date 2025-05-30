import { InnerLayout } from "@/widgets/layout";
import { motion } from "motion/react";
import { useProperties } from "../model/useProperties";
import { Form, Spin } from "antd";
import { PropertyRooms } from "./PropertyRooms";
import { InputRange } from "@/shared/ui/input-range";
import { Link, useParams } from "react-router";
import { HeartOutlined } from "@ant-design/icons";
import { APP_ROUTES } from "@/shared/routes";
import { ComplexCard } from "@/entities/complex-card";
import { InfoWrapper } from "@/shared/ui";

export const PropertiesPage = () => {
    const { project, publication_type } = useParams();
    const { form, properties, addProperties, isLoading, isFetching, filters, onValuesChange, isSuccess } = useProperties();

    return (
        <InnerLayout
            left={
                <div className="flex flex-col gap-30">
                    <InfoWrapper title={"Планировки"} description={"Просто выберите свой вариант — остальное мы сделаем за вас"} />
                    <Link to={`/${publication_type}/${project}/${APP_ROUTES.FAVORITES}`} className="w-full">
                        <button className={["h-60 flex items-center justify-start button-groups w-full active"].join(" ")}>
                            <div className="w-60 h-60 flex justify-center items-center relative z-10">
                                <HeartOutlined />
                            </div>
                            <span className="px-20 relative z-10">Избранные</span>
                        </button>
                    </Link>
                    {isSuccess && filters && (
                        <Form form={form} onValuesChange={onValuesChange} className="flex flex-col gap-30">
                            <Form.Item name={"rooms"}>
                                <PropertyRooms rooms={filters?.rooms || []} />
                            </Form.Item>
                            <Form.Item name={"floor"}>
                                <InputRange min={filters.min_floor} max={filters.max_floor} points={[filters.min_floor, filters.max_floor]} title="Этажность" unit="" />
                            </Form.Item>
                            <Form.Item name={"size"}>
                                <InputRange min={filters.min_size} max={filters.max_size} points={[filters.min_size, filters.max_size]} title="Общая площадь" unit="м²" />
                            </Form.Item>
                            <Form.Item name={"price_per_meter"}>
                                <InputRange
                                    min={filters.min_price_per_meter}
                                    max={filters.max_price_per_meter}
                                    points={[filters.min_price_per_meter, filters.max_price_per_meter]}
                                    title="Цена за "
                                    unit="м²"
                                />
                            </Form.Item>
                            <Form.Item name={"price"}>
                                <InputRange min={filters.min_price} max={filters.max_price} points={[filters.min_price, filters.max_price]} title="Полная цена" unit="₸" />
                            </Form.Item>
                        </Form>
                    )}
                </div>
            }
            right={
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="p-20 bg-white/5 h-full overflow-auto">
                    <Spin spinning={isLoading || isFetching}>
                        <div className="grid grid-cols-12 gap-20">
                            {properties?.data?.map((property) => (
                                <div className="col-span-3" key={property?.id}>
                                    <ComplexCard property={property} />
                                </div>
                            ))}
                            {properties && properties?.per_page < properties?.total && (
                                <div className="col-span-12 flex items-center justify-center">
                                    <button className="h-60 bg-white/5 px-40 text-[16px] text-white mt-20" onClick={addProperties}>
                                        Показать еще
                                    </button>
                                </div>
                            )}
                        </div>
                    </Spin>
                </motion.div>
            }
        />
    );
};
