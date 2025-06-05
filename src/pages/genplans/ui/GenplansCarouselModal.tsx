import type { GenplanPins } from "@/shared/api/genplans/types";
import { useCarousel } from "@/shared/hooks/useCarousel";
import { ArrowButtons } from "@/shared/ui";
import { Carousel, Modal, type ModalProps } from "antd";
import { useState } from "react";

interface GenplansCarouselModalProps extends ModalProps {
    content: null | GenplanPins;
}

export const GenplansCarouselModal: React.FC<GenplansCarouselModalProps> = (props) => {
    const { content } = props;
    const { carouselRef } = useCarousel();
    const [index, setIndex] = useState(0);

    return (
        <Modal {...props} centered footer={null} closeIcon={false} classNames={{ content: "min-w-820" }}>
            <div className="flex flex-col">
                <div className="relative h-460">
                    <Carousel dots={false} ref={carouselRef} beforeChange={(_, id) => setIndex(id)}>
                        {content?.contents?.[0]?.variants?.map((variant, i) => (
                            <div key={i}>
                                <img src={variant?.file} alt="file" />
                            </div>
                        ))}
                    </Carousel>
                    {content?.contents?.[0]?.variants && content?.contents?.[0]?.variants?.length > 1 && (
                        <ArrowButtons total={content?.contents?.[0]?.variants?.length as number} className="absolute bottom-0 left-0 gap-12" ref={carouselRef} />
                    )}
                </div>
                <div className="flex items-start gap-30 py-40 px-20">
                    <div className="min-w-60 w-60 h-60">
                        <img src={content?.icon} alt="icon" className="!object-contain" />
                    </div>
                    <div className="flex flex-col gap-12">
                        <h3 className="!text-black !text-[32px]">{content?.contents?.[0]?.variants?.[index]?.title}</h3>
                        <p className="!text-black !leading-[1.2]">{content?.contents?.[0]?.variants?.[index]?.description}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
