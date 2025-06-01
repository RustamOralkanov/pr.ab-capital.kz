import { useGetAboutPagesByIdQuery, useGetAboutPagesSectionsQuery } from "@/shared/api/about-pages";
import { useCarousel } from "@/shared/hooks/useCarousel";
import { ArrowButtons, InfoWrapper, VideoWrapper } from "@/shared/ui";
import { InnerLayout } from "@/widgets/layout";
import { Carousel } from "antd";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const AboutPage = () => {
    const { alias } = useParams();
    const { carouselRef } = useCarousel();

    const { data } = useGetAboutPagesByIdQuery({ alias }, { skip: !alias });
    const { data: sections, isSuccess } = useGetAboutPagesSectionsQuery({ id: String(data?.id) }, { skip: !data?.id });

    const [index, setIndex] = useState<number | null>(null);

    const content = sections?.filter((content) => content?.id === index);
    const contentType = sections?.find((content) => content?.id === index)?.type;

    useEffect(() => {
        if (isSuccess) setIndex(sections?.[0]?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    return (
        <InnerLayout
            left={
                <>
                    <InfoWrapper icon={data?.icon} description={data?.subtitle} buttons={sections} onClick={(id) => setIndex(id)} activeId={index as number} />
                    {(contentType === "carousel" || sections?.length === 0) && content && content?.length > 0 && (
                        <ArrowButtons total={content?.[0]?.contents?.length as number} ref={carouselRef} key={index || alias} />
                    )}
                </>
            }
            right={
                <>
                    {contentType === "video" && <VideoWrapper link={content?.[0]?.contents?.[0]?.youtube_link || ""} file={content?.[0]?.contents?.[0]?.file || ""} />}
                    {contentType === "carousel" && (
                        <Carousel dots={false} ref={carouselRef}>
                            {content?.[0]?.contents?.map((item, i) => (
                                <div key={i}>
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
                </>
            }
        />
    );
};
