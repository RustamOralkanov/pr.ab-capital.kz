import { useGetProjectsQuery } from "@/shared/api/projects";
import { useCarousel } from "@/shared/hooks/useCarousel";
import { ArrowButtons, InfoWrapper } from "@/shared/ui";
import { InnerLayout } from "@/widgets/layout";
import { Carousel } from "antd";
import { motion } from "motion/react";
import { useState } from "react";

export const ProjectsPage = () => {
    const [index, setIndex] = useState(1);
    const { carouselRef } = useCarousel();
    const { data: projects } = useGetProjectsQuery({});

    return (
        <InnerLayout
            left={
                <>
                    <InfoWrapper title={projects?.[index]?.title} />
                    <div className="p-30 bg-white/5 backdrop-blur-lg flex flex-col gap-30">
                        {[
                            { label: "Класс", value: projects?.[index]?.project_class },
                            { label: "Площадь застройки", value: projects?.[index]?.site_area },
                            { label: "Год постройки", value: projects?.[index]?.date_build },
                            { label: "Год сдачи", value: projects?.[index]?.date_completion },
                        ]?.map((item, i) => (
                            <div key={i} className={["flex flex-col gap-10", i !== 3 ? "pb-30 border-b-1 border-b-gray" : ""].join(" ")}>
                                <span className="!text-sm !leading-[1] text-gray">{item?.label}</span>
                                <motion.span
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1 }}
                                    className="!text-[20px] !leading-[1] text-white"
                                    key={index}
                                >
                                    {item?.value}
                                </motion.span>
                            </div>
                        ))}
                    </div>
                    <ArrowButtons total={projects?.length as number} ref={carouselRef} />
                </>
            }
            right={
                <motion.div className="relative w-full h-full" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                    <Carousel dots={false} ref={carouselRef} beforeChange={(_, id) => setIndex(id)}>
                        {projects?.map((item, i) => (
                            <div key={i}>
                                <div className="w-full h-[calc(100dvh_-_240px)] max-xl:h-[calc(100dvh_-_160px)] relative">
                                    <img src={item?.images?.[0]?.image} alt="image" />
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </motion.div>
            }
        />
    );
};
