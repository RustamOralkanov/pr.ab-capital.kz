import { InnerLayout } from "@/widgets/layout";
import { motion } from "motion/react";
import { useGetPropertiesByIdQuery } from "../api";
import { Link, useParams } from "react-router";
import { addToFavorite, AddToFavorite } from "@/features/add-to-favorite";
import { useAppDispatch } from "@/shared/libs/redux";
import type { Daum } from "../types";

export const PropertiesByIdPage = () => {
    const { id, publication_type, project } = useParams();
    const { data } = useGetPropertiesByIdQuery({ id });
    const dispatch = useAppDispatch();

    return (
        <InnerLayout
            left={
                <div className="flex flex-col gap-30">
                    <h2>Планировка</h2>
                    <p>Просто выберите свой вариант — остальное мы сделаем за вас</p>
                    <div className="flex flex-col gap-20">
                        {data?.similarProperties?.map((property) => (
                            <div className="!bg-gray-3 !block" key={property?.id}>
                                <div className="grid grid-cols-12">
                                    <div className="col-span-5">
                                        <div className="py-20 pr-14 pl-20 flex flex-col gap-64">
                                            <div className="flex items-start justify-between">
                                                <img src={property?.project_logo} alt="project_logo" className="!w-fit !h-27 !object-contain" />
                                                <AddToFavorite onClick={() => dispatch(addToFavorite(property as unknown as Daum))} propertyId={`${property?.id}`} />
                                            </div>
                                            <Link to={`/${publication_type}/${project}/properties/${property?.id}`} className="flex flex-col gap-10">
                                                <span className="!text-black !leading-[1] !text-[20px]">{property?.rooms} комнатная</span>
                                                <span className="!text-black !leading-[1] !text-[20px]">{property?.size} м²</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-span-7">
                                        <Link to={`/${publication_type}/${project}/properties/${property?.id}`} className="!block h-full">
                                            <img src={property?.plans?.[0]?.image} alt="image" className="!object-contain" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            right={
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="h-full">
                    <div className="grid grid-cols-12 h-[calc(100dvh_-_240px)] max-xl:h-[calc(100dvh_-_160px)]">
                        <div className="col-span-8 ">
                            <div className="bg-white h-full p-20 flex flex-col justify-between">
                                <div className="w-full h-[calc(100dvh_-_340px)] max-xl:h-[calc(100dvh_-_280px)]">
                                    <img src={data?.property?.plans?.[0]?.image} alt="image" className="!object-contain" />
                                </div>
                                <p className="!text-gray !text-xs line-clamp-3">
                                    Архитектура проекта, изображения благоустройства, фасадов, интерьера, применяемых материалов, их нумерация, инфраструктура комплекса являются
                                    условными и могут быть изменены в ходе проектирования, строительства и эксплуатации в рамках положительного заключения государственной
                                    экспертизы. Настоящая реклама, в соответствии со ст. 395 ГК РК не является публичной офертой.
                                </p>
                            </div>
                        </div>
                        <div className="col-span-4 ">
                            <div className="bg-gray-3 p-40 flex flex-col gap-40 h-[calc(100dvh_-_240px)] overflow-auto max-xl:h-[calc(100dvh_-_160px)]">
                                <div className="flex items-start justify-between">
                                    <img src={data?.property?.project_logo} alt="project_logo" className="!w-fit !h-54 !object-contain" />
                                    <AddToFavorite onClick={() => dispatch(addToFavorite(data?.property as unknown as Daum))} propertyId={`${data?.property?.id}`} />
                                </div>
                                <h4 className="!text-[32px] !text-black !font-medium">{data?.property?.price?.toLocaleString()} ₸</h4>
                                <div className="flex items-start justify-between">
                                    <h5 className="uppercase !text-black !font-semibold !text-sm">{data?.property?.rooms} комнатная</h5>
                                    <h5 className="uppercase !text-black !font-semibold !text-sm">{data?.property?.section} блок</h5>
                                </div>
                                <div className="flex flex-col gap-5">
                                    {[
                                        { label: "Площадь", value: data?.property?.size + " c" },
                                        { label: "Этаж", value: data?.property?.floor },
                                        { label: "Сдача объекта", value: `${data?.property?.house?.check_in_year}/${data?.property?.house?.check_in_quarter}` },
                                    ]?.map((item, i) => (
                                        <div className="flex items-center justify-between pb-5 border-b-1 border-b-gray-2" key={i}>
                                            <div className="!text-xs !leading-[1] !text-black">{item?.label}</div>
                                            <div className="!text-sm !font-semibold !leading-[1] !text-black">{item?.value}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-10">
                                    {paymentData?.map((item, i) => (
                                        <div key={i} className="p-20 bg-white flex flex-col gap-10">
                                            <h4 className="!text-black !text-sm !font-semibold">{item?.title}</h4>
                                            <p className="!text-gray !text-xs">{item?.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            }
        />
    );
};

const paymentData = [
    {
        title: "Оплата 100%",
        sub_title: "",
        description: "со скидкой от 9%",
    },
    {
        title: "Рассрочка",
        sub_title: "",
        description: "Квартиру можно купить в рассрочку под 0%",
    },
    {
        title: "Ипотека",
        sub_title: "",
        description: "Квартиру можно купить в ипотеку вместе с дополнительными опциями. Оплата будет включена в ежемесячный платеж.",
    },
];
