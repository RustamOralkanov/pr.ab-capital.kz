import { InnerLayout } from "@/widgets/layout";
import { InfoWrapper } from "@/shared/ui";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetMenuQuery } from "@/shared/api/menu";
import { useGetGenplansQuery } from "@/shared/api/genplans";

export const GenplansPage = () => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    const { project, publication_type } = useParams();
    const { data: menus } = useGetMenuQuery({ publication_type, project });
    const { data: genplans } = useGetGenplansQuery({ publication_type, project });

    const info = menus?.find((menu) => menu?.type === "genplan");

    useEffect(() => {
        if (info?.file) {
            const bgImage = info?.file;
            if (bgImage) {
                const img = new Image();

                img.src = bgImage;
                img.onload = () => {
                    setImageDimensions({ width: img.width, height: img.height });
                };
            }
        }

        return () => {
            setImageDimensions({ width: 0, height: 0 });
        };
    }, [info]);

    const toggleSelection = (id: number) => {
        const allIds = genplans?.map((l) => l.id) || [];

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

    const selectedContents = genplans?.filter((section) => selectedIndexes.includes(section.id));

    return (
        <InnerLayout
            left={
                <div className="flex flex-col gap-30">
                    <InfoWrapper title={info?.title} description={info?.description} />
                    <div className="flex flex-col">
                        {[
                            {
                                id: -1,
                                title: info?.btn_text,
                                icon: "",
                                type: "",
                            },
                            ...(genplans?.map((location) => ({ ...location })) || []),
                        ]?.map((button) => (
                            <button
                                key={button.id}
                                className={["h-60 flex items-center justify-start button-groups", selectedIndexes.includes(button.id) ? "active" : ""].join(" ")}
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
                <motion.div className="relative w-full h-full" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} key={project}>
                    <svg
                        width="100%"
                        height={"100%"}
                        preserveAspectRatio="xMidYMid slice"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox={`0 0 ${imageDimensions.width} ${imageDimensions.height}`}
                    >
                        <image href={info?.file} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
                        {selectedContents?.map((content) => {
                            return content.pins.map((pin) => {
                                return pin?.pins?.map((point) => {
                                    return point?.points?.map((coord, index) => {
                                        const [x, y] = coord.split(",").map(Number);
                                        return (
                                            <g key={index} className={[pin?.contents.length > 0 ? "cursor-pointer transition-all hover:opacity-80" : ""].join(" ")}>
                                                <image
                                                    href={pin?.icon}
                                                    x={Number(x) - 30}
                                                    y={Number(y) - 30}
                                                    width={60}
                                                    height={60}
                                                    fill="red"
                                                    onClick={() => (pin?.contents?.length > 0 ? null : null)}
                                                />
                                            </g>
                                        );
                                    });
                                });
                            });
                        })}
                    </svg>
                </motion.div>
            }
        />
    );
};
