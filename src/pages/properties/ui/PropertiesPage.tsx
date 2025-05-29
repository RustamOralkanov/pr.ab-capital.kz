import { InnerLayout } from "@/widgets/layout";
import { motion } from "motion/react";
import { addToFavorite, AddToFavorite } from "@/features/add-to-favorite";
import { useProperties } from "../model/useProperties";
import { Form, Spin } from "antd";
import { PropertyRooms } from "./PropertyRooms";
import { InputRange } from "@/shared/ui/input-range";
import { Link } from "react-router";
import { useAppDispatch } from "@/shared/libs/redux";

export const PropertiesPage = () => {
    const dispatch = useAppDispatch();
    const { form, properties, addProperties, isLoading, isFetching, filters, onValuesChange, isSuccess } = useProperties();

    return (
        <InnerLayout
            left={
                <div className="flex flex-col gap-30">
                    <h2>Планировки</h2>
                    <p>Просто выберите свой вариант — остальное мы сделаем за вас</p>
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
                                    <div className="block !bg-gray-3 p-20 h-full">
                                        <div className="flex justify-between items-end mb-10">
                                            <div className="max-h-33">
                                                <img src={property?.project_logo} alt="logo" className="max-h-33 !object-contain" />
                                            </div>
                                            <AddToFavorite onClick={() => dispatch(addToFavorite(property))} propertyId={`${property?.id}`} />
                                        </div>
                                        <Link to={`${property?.id}`}>
                                            <div className="h-225 -mx-20">
                                                <img src={property?.plans?.[0]?.image} alt="image" className="!object-contain" />
                                            </div>
                                            <div className="flex flex-col gap-30 pt-30">
                                                <h5 className="!text-[20px] !leading-[1] !text-black">{property?.rooms} комнатная</h5>
                                                <div className="flex flex-col gap-5">
                                                    {[
                                                        { label: "Площадь", value: property?.size + " м²" },
                                                        { label: "Номер блока", value: property?.section },
                                                        { label: "Этаж", value: property?.floor },
                                                        { label: "Сдача объекта", value: `${property?.house?.check_in_year}/${property?.house?.check_in_quarter}` },
                                                    ]?.map((item, i) => (
                                                        <div className="flex items-center justify-between pb-5 border-b-1 border-b-gray-2" key={i}>
                                                            <div className="!text-xs !leading-[1] !text-black">{item?.label}</div>
                                                            <div className="!text-sm !font-semibold !leading-[1] !text-black">{item?.value}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex flex-col gap-10">
                                                    <h3 className="!leading-[1] !text-black">{property?.price?.toLocaleString()} ₸</h3>
                                                    <div className="!text-xs !text-gray !leading-[1]">
                                                        Цена за м²: <span className="!text-sm !font-semibold !text-gray">{property?.price_per_meter?.toLocaleString()} ₸</span>
                                                    </div>
                                                </div>
                                                {property?.specialOffers?.length > 0 && (
                                                    <div className="flex items-center gap-10">
                                                        {property?.specialOffers
                                                            ?.filter((item) => item?.is_active == 1)
                                                            ?.map((offer) => (
                                                                <div className="bg-white !text-black flex items-center gap-5 p-7 !text-xs !leading-[1]" key={offer?.id}>
                                                                    <img src="/lightning.svg" alt="icon" className="max-w-16 max-h-16 !object-contain" />
                                                                    {offer?.name}
                                                                </div>
                                                            ))}
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    </div>
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
