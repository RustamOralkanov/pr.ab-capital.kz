import { forwardRef, useEffect, useState, type Ref } from "react";
import type { CarouselRef } from "antd/es/carousel";
import { useAppSelector } from "@/shared/libs/redux";
import "./ArrowButtons.scss";
import { useParams } from "react-router";

interface ArrowButtonsProps {
    total: number;
    className?: string;
}

export const ArrowButtons = forwardRef<CarouselRef, ArrowButtonsProps>((props, ref) => {
    const { total } = props;
    const { project, publication_type, menu_alias } = useParams();
    const [current, setCurrent] = useState(1);

    const { reverse } = useAppSelector((state) => state?.reverse);

    const isRefObject = (ref: Ref<CarouselRef | null>): ref is React.RefObject<CarouselRef> => typeof ref === "object" && ref !== null && "current" in ref;

    const handleNext = () => {
        setCurrent((prev) => (prev < total ? prev + 1 : 1));
        if (isRefObject(ref)) {
            ref.current?.next?.();
        }
    };

    const handlePrev = () => {
        setCurrent((prev) => (prev > 1 ? prev - 1 : total));
        if (isRefObject(ref)) {
            ref.current?.prev?.();
        }
    };

    useEffect(() => setCurrent(1), [project, publication_type, menu_alias]);

    return (
        <div className={[reverse ? "flex-row-reverse" : "", "flex items-center justify-between mt-30", props?.className].join(" ")}>
            <div className="flex items-center">
                <button className="w-60 h-60 flex items-center justify-center arrow-button" onClick={handlePrev}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M11.0303 8.53033C11.3232 8.23744 11.3232 7.76256 11.0303 7.46967C10.7374 7.17678 10.2626 7.17678 9.96967 7.46967L5.96967 11.4697C5.82322 11.6161 5.75 11.8081 5.75 12C5.75 12.1017 5.77024 12.1987 5.80691 12.2871C5.84351 12.3755 5.89776 12.4584 5.96967 12.5303L9.96967 16.5303C10.2626 16.8232 10.7374 16.8232 11.0303 16.5303C11.3232 16.2374 11.3232 15.7626 11.0303 15.4697L8.31066 12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H8.31066L11.0303 8.53033Z"
                            fill="#D6ED17"
                        />
                    </svg>
                </button>
                <button className="w-60 h-60 flex items-center justify-center arrow-button" onClick={handleNext}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M13.4697 8.53033C13.1768 8.23744 13.1768 7.76256 13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967L18.5303 11.4697C18.8232 11.7626 18.8232 12.2374 18.5303 12.5303L14.5303 16.5303C14.2374 16.8232 13.7626 16.8232 13.4697 16.5303C13.1768 16.2374 13.1768 15.7626 13.4697 15.4697L16.1893 12.75H6.5C6.08579 12.75 5.75 12.4142 5.75 12C5.75 11.5858 6.08579 11.25 6.5 11.25H16.1893L13.4697 8.53033Z"
                            fill="#D6ED17"
                        />
                    </svg>
                </button>
            </div>
            <div className={[reverse ? "flex-row-reverse" : "", "flex items-center gap-10"].join(" ")}>
                <h2>{current < 9 ? "0" + current : current}</h2>
                <span className="!text-[20px] !text-white/50">{total < 9 ? "0" + total : total}</span>
            </div>
        </div>
    );
});

ArrowButtons.displayName = "ArrowButtons";
