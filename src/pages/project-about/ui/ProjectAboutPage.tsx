import { useGetAboutQuery, useGetAboutSectionsQuery } from "@/shared/api/about";
import { useGetAdvantagesQuery } from "@/shared/api/advantages";
import { useCarousel } from "@/shared/hooks/useCarousel";
import { InnerLayout } from "@/widgets/layout";
import { ArrowButtons, InfoWrapper, VideoWrapper } from "@/shared/ui";
import { Carousel } from "antd";
import { motion } from "motion/react";
import { useState } from "react";
import { useParams } from "react-router";

export const ProjectAboutPage = () => {
    const [index, setIndex] = useState<number | null>(null);
    const { carouselRef } = useCarousel();

    const { project, publication_type } = useParams();
    const { data: about } = useGetAboutQuery({ publication_type, project });
    const { data: sections } = useGetAboutSectionsQuery({ publication_type, project });
    const { data: advantages } = useGetAdvantagesQuery({ publication_type, project });

    const content = sections?.find((section) => section?.id === index);

    return (
        <InnerLayout
            left={
                <>
                    <InfoWrapper
                        title={about?.title}
                        subtitle={about?.subtitle}
                        description={about?.description}
                        buttons={sections?.map((section) => ({ ...section }))}
                        onClick={(e) => setIndex(e)}
                    />
                    {content?.type === "carousel" && <ArrowButtons total={content?.contents?.length as number} ref={carouselRef} />}
                </>
            }
            right={
                <motion.div className="relative w-full h-full" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} key={index}>
                    {index === null && (
                        <>
                            <img src={about?.image} alt="image" />
                            {advantages && advantages?.length > 0 && (
                                <div className="blur-wrapper">
                                    <div className="flex items-center gap-30">
                                        {advantages?.map((item) => (
                                            <div key={item?.id} className="flex flex-col gap-5">
                                                <span className="!text-[15px] !font-semibold !text-gray-70">{item?.title}</span>
                                                <span className="!text-[20px] !font-[300] text-white">{item?.subtitle}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    {content?.type === "video" && <VideoWrapper link={content?.contents?.[0]?.link} file={content?.contents?.[0]?.file} />}
                    {content?.type === "carousel" && (
                        <Carousel dots={false} ref={carouselRef}>
                            {content?.contents?.map((item) => (
                                <div key={item?.id}>
                                    <div className="w-full h-[calc(100dvh_-_240px)] max-xl:h-[calc(100dvh_-_160px)]">
                                        <img src={item?.image} alt="image" />
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
