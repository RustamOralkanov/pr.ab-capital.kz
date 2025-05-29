import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { ChevronIcon } from "@/shared/icons/ChevronIcon";
import { APP_ROUTES } from "@/shared/routes";
import { Link } from "react-router";
import { useGetProjectsQuery } from "@/shared/api/projects";

export const MapPage = () => {
    const { data } = useGetProjectsQuery({});
    return (
        <div className="h-[calc(100dvh_-_160px)] py-40 border-b-1 border-b-green max-xl:h-[calc(100dvh_-_120px)] max-xl:py-20 relative">
            <YMaps>
                <Map defaultState={{ center: [43.233066, 76.936992], zoom: 13 }} style={{ height: 100 + "%" }}>
                    {data?.map((coord) => (
                        <Placemark
                            key={coord?.id}
                            options={{
                                zIndex: 100,
                            }}
                            geometry={[Number(coord?.latitude), Number(coord?.longitude)]}
                            properties={{
                                iconContent: `
                                            <div class="complex-pin">
                                               <div class="complex-pin-icon">
                                                    <img src="${coord?.images?.[0]?.image}"/>
                                               </div>
                                               <span class="complex-pin-title">
                                                    ${coord?.title}
                                               </span>
                                            </div>
                                        `,
                            }}
                        />
                    ))}
                </Map>
            </YMaps>
            <div className="flex items-center absolute left-20 bottom-60 max-xl:bottom-40">
                <Link to={`/${APP_ROUTES.HOME}`} className="flex items-center gap-8 !bg-green h-50 px-26 !text-black !text-[15px]">
                    <ChevronIcon className="rotate-90" />
                    На главную
                </Link>
            </div>
        </div>
    );
};
