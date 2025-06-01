import { useCarousel } from "@/shared/hooks/useCarousel";
import { InnerLayout } from "@/widgets/layout";
import { ArrowButtons, InfoWrapper, VideoWrapper } from "@/shared/ui";
import { Carousel } from "antd";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetMenuQuery } from "@/shared/api/menu";
import { useGetCarouselsContentsQuery, useGetCarouselsQuery } from "@/shared/api/carousels";

export const CarouselsPage = () => {
    const [index, setIndex] = useState<number | null>(null);
    const { carouselRef } = useCarousel();

    const { project, publication_type, menu_alias } = useParams();
    const { data: sections } = useGetCarouselsQuery({ publication_type, project, menu_alias });
    const { data: contents } = useGetCarouselsContentsQuery({ publication_type, project, menu_alias });
    const { data: menus } = useGetMenuQuery({ publication_type, project });

    const info = menus?.find((menu) => menu?.alias === menu_alias);
    const content = contents?.filter((content) => content?.pr_project_carousel_id === index);
    const contentType = sections?.find((section) => section?.id === index)?.type;

    useEffect(() => setIndex(null), [project, publication_type, menu_alias]);

    return (
        <InnerLayout
            left={
                <>
                    <InfoWrapper title={info?.title} description={info?.description} buttons={sections} onClick={(id) => setIndex(id)} />
                    {(contentType === "carousel" || sections?.length === 0) && content && content?.length > 0 && (
                        <ArrowButtons total={content?.length as number} ref={carouselRef} key={index || menu_alias} />
                    )}
                </>
            }
            right={
                <motion.div
                    className="relative w-full h-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    key={index || menu_alias}
                >
                    {index === null && content && content?.length === 0 && <img src={info?.file} alt="image" />}
                    {contentType === "video" && <VideoWrapper link={content?.[0]?.youtube_link || ""} file={content?.[0]?.file || ""} />}
                    {contentType === "carousel" && (
                        <Carousel dots={false} ref={carouselRef}>
                            {content?.map((item) => (
                                <div key={item?.id}>
                                    <div className="w-full h-[calc(100dvh_-_240px)] max-xl:h-[calc(100dvh_-_160px)] relative">
                                        <img src={item?.image} alt="image" />
                                        {item?.title && (
                                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} className="blur-wrapper">
                                                <div className="flex flex-col gap-5 max-w-600">
                                                    <span className="!text-[20px] !font-semibold !text-gray-70">{item?.title}</span>
                                                    <span className="!text-sm !font-[300] text-white">{item?.description}</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    )}
                    {sections?.length === 0 && content && content?.length > 0 && (
                        <Carousel dots={false} ref={carouselRef} className="text">
                            {content?.map((item) => (
                                <div key={item?.id}>
                                    <div className="w-full h-[calc(100dvh_-_240px)] max-xl:h-[calc(100dvh_-_160px)] relative">
                                        <img src={item?.image} alt="image" />
                                        {item?.title && (
                                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} className="blur-wrapper">
                                                <div className="flex flex-col gap-5 max-w-600">
                                                    <span className="!text-[20px] !font-semibold !text-gray-70">{item?.title}</span>
                                                    <span className="!text-sm !font-[300] text-white">{item?.description}</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    )}
                </motion.div>
            }
        />
    );
};
