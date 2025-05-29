import type { CarouselRef } from "antd/es/carousel";
import type { RefObject } from "react";
import { useRef } from "react";

export const useCarousel = () => {
    const carouselRef: RefObject<CarouselRef | null> = useRef(null);

    const prevSlide = () => {
        carouselRef.current?.prev();
    };

    const nextSlide = () => {
        carouselRef.current?.next();
    };
    return { carouselRef, prevSlide, nextSlide };
};
