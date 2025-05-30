import { addToFavorite, AddToFavorite } from "@/features/add-to-favorite";
import type { Daum } from "@/pages/properties/types";
import { useAppDispatch } from "@/shared/libs/redux";
import { APP_ROUTES } from "@/shared/routes";
import { Link, useParams } from "react-router";

export const ComplexCard: React.FC<{ property: Daum }> = ({ property }) => {
    const dispatch = useAppDispatch();
    const { project, publication_type } = useParams();
    return (
        <div className="block !bg-gray-3 p-20 h-full">
            <div className="flex justify-between items-end mb-10">
                <div className="max-h-33">
                    <img src={property?.project_logo} alt="logo" className="max-h-33 !object-contain" />
                </div>
                <AddToFavorite onClick={() => dispatch(addToFavorite(property))} propertyId={`${property?.id}`} />
            </div>
            <Link to={`/${publication_type}/${project}/${APP_ROUTES.PROPERTIES}/${property?.id}`}>
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
    );
};
