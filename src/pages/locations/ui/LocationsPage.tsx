import { YMaps, Map, Placemark, Circle } from "@pbe/react-yandex-maps";
import { InnerLayout } from "@/widgets/layout";
import { InfoWrapper } from "@/shared/ui";
import { motion } from "motion/react";
import { useState } from "react";
import { useParams } from "react-router";
import { useGetLocationsQuery } from "@/shared/api/locations";
import { useGetMenuQuery } from "@/shared/api/menu";
import { useGetProjectsQuery } from "@/shared/api/projects";
import { useAppSelector } from "@/shared/libs/redux";

import "./LocationsPage.scss";
import React from "react";

export const LocationsPage = () => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

    const { reverse } = useAppSelector((state) => state?.reverse);
    const { project, publication_type } = useParams();
    const { data: menus } = useGetMenuQuery({ publication_type, project });
    const { data: locations } = useGetLocationsQuery({ publication_type, project });
    const { data: projects } = useGetProjectsQuery({});

    const info = menus?.find((menu) => menu?.type === "location");
    const complex = projects?.find((p) => p?.alias === project);

    const toggleSelection = (id: number) => {
        const allIds = locations?.map((l) => l.id) || [];

        if (id === -1) {
            const isAllSelected = allIds.every((id) => selectedIndexes.includes(id));
            if (isAllSelected) {
                setSelectedIndexes([]);
            } else {
                setSelectedIndexes([-1, ...allIds]);
            }
        } else {
            setSelectedIndexes((prev) => {
                const isSelected = prev.includes(id);
                let next = isSelected ? prev.filter((i) => i !== id && i !== -1) : [...prev.filter((i) => i !== -1), id];

                const isAllNowSelected = allIds.every((id) => next.includes(id));
                if (isAllNowSelected) {
                    next = [-1, ...next];
                }

                return next;
            });
        }
    };

    const selectedContents = locations?.filter((section) => selectedIndexes.includes(section.id));
    const circles = locations?.filter((location) => location?.type === "circle");
    console.log(circles);

    return (
        <InnerLayout
            left={
                <div className="flex flex-col gap-30">
                    <InfoWrapper title={info?.title} description={info?.description} />
                    <div className="flex flex-col">
                        {[
                            ...(locations && locations?.filter((location) => location.type !== "circle").length > 0
                                ? [
                                      {
                                          id: -1,
                                          title: info?.btn_text,
                                          icon: "",
                                          type: "",
                                      },
                                  ]
                                : []),
                            ...(locations?.filter((location) => location.type !== "circle")?.map((location) => ({ ...location })) || []),
                        ]?.map((button) => (
                            <button
                                key={button.id}
                                className={[
                                    "h-60 flex items-center justify-start button-groups",
                                    selectedIndexes.includes(button.id) ? "active" : "",
                                    reverse ? "flex-row-reverse reverse" : "",
                                ].join(" ")}
                                onClick={() => toggleSelection(button.id)}
                            >
                                {button?.icon && (
                                    <div className="w-60 h-60 flex justify-center items-center relative z-10">
                                        <img src={button?.icon} alt="icon" className="!w-24 !h-24 object-contain" />
                                    </div>
                                )}
                                <span className="px-20 relative z-10">{button.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            }
            right={
                <motion.div className="relative w-full h-full" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} key={project}>
                    <YMaps>
                        <Map defaultState={{ center: [Number(complex?.latitude), Number(complex?.longitude)], zoom: 14 }} style={{ height: 100 + "%" }}>
                            <Placemark
                                geometry={[Number(complex?.latitude), Number(complex?.longitude)]}
                                properties={{
                                    iconContent: `<div class="tooltip"><h3 class="tooltip-title">${complex?.title}</h3></div>`,
                                }}
                            />
                            {selectedContents?.flatMap((content) =>
                                content?.contents?.map((item, idx) => (
                                    <Placemark
                                        key={`${content.id}-${idx}`}
                                        options={{ zIndex: 100 }}
                                        geometry={[item?.points?.[1], item?.points?.[0]]}
                                        properties={{
                                            iconContent: `<div class="map-container">
                                                                <div class="map-wrapper">
                                                                    <div class="map-wrapper-image">
                                                                        <img src="${content?.icon}" alt="map-image"/>
                                                                    </div>
                                                                </div>
                                                            </div>`,
                                        }}
                                    />
                                ))
                            )}

                            {circles?.map((circle) => {
                                return circle?.contents?.map((content, i) => {
                                    const radius = (i + 1) * 1000; // в метрах
                                    const lat = Number(complex?.latitude);
                                    const lng = Number(complex?.longitude);
                                    const lngOffset = radius / (111320 * Math.cos((lat * Math.PI) / 180)); // перевод в градусы

                                    return (
                                        <React.Fragment key={i}>
                                            <Circle
                                                geometry={[[Number(complex?.latitude), Number(complex?.longitude)], (i + 1) * 1000]}
                                                options={{
                                                    fillColor: "#ffffff00",
                                                    strokeColor: "#2691F4",
                                                    strokeOpacity: 1,
                                                    strokeWidth: 2,
                                                    strokeStyle: "dash",
                                                }}
                                            />
                                            <Placemark
                                                options={{ zIndex: 100 }}
                                                geometry={[lat, lng - lngOffset]} // Смещение влево
                                                properties={{
                                                    iconContent: `
                                                                <div class="commerce-balloon ">
                                                                    <div>${content?.title}</div>
                                                                    <div>${content?.subtitle}</div>
                                                                </div>`,
                                                }}
                                            />
                                        </React.Fragment>
                                    );
                                });
                            })}
                        </Map>
                    </YMaps>
                </motion.div>
            }
        />
    );
};

// `<div class="map-container">
// <div class="map-wrapper">
// <div class="map-wrapper-image">
// <img src="${content?.icon}" alt="map-image"/>
// </div>
// <div class="map-title">
// <h3>${item?.title}</h3>
// </div>
// </div>`
