import type { ReactNode } from "react";
import { Menu } from "../menu";
import { useLocation, useNavigate } from "react-router";
import { APP_ROUTES } from "@/shared/routes";
import { ChevronIcon } from "@/shared/icons/ChevronIcon";
import { useAppSelector } from "@/shared/libs/redux";

export const InnerLayout: React.FC<{ left: ReactNode; right: ReactNode }> = ({ left, right }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { reverse } = useAppSelector((state) => state?.reverse);
    const { publicationType } = useAppSelector((state) => state?.publicationType);

    const isProperties = pathname?.includes(APP_ROUTES.PROPERTIES) || pathname?.includes(APP_ROUTES.FAVORITES) || pathname?.includes(APP_ROUTES.COMPARE);

    return (
        <div
            className={["grid grid-cols-12 gap-40 py-40 border-b-1 border-b-green h-[calc(100dvh_-_160px)] max-xl:h-[calc(100dvh_-_120px)] max-xl:py-20 max-xl:gap-20"].join(" ")}
            key={publicationType}
        >
            <div className={[reverse ? "order-2" : "order-1", "col-span-3 max-xl:col-span-4 relative "].join(" ")}>
                <div className="flex flex-col justify-between overflow-auto h-[calc(100dvh_-_320px)] max-xl:h-[calc(100dvh_-_240px)]">
                    {left}
                    {isProperties ? (
                        <button
                            className={[reverse ? "flex-row-reverse" : "", "absolute bottom-0 left-0 w-full flex items-center cursor-pointer"].join(" ")}
                            onClick={() => navigate(-1)}
                        >
                            <div className="min-w-60 h-60 justify-center flex items-center bg-green">
                                <ChevronIcon className={[reverse ? "-rotate-90" : "rotate-90"].join(" ")} />
                            </div>
                            <div className={[reverse ? "justify-end" : "", "h-60 w-full px-20 flex items-center uppercase !font-semibold text-white"].join(" ")}>Назад</div>
                        </button>
                    ) : (
                        <Menu />
                    )}
                </div>
            </div>
            <div className={[reverse ? "order-1" : "order-2", "col-span-9 max-xl:col-span-8 order-1"].join(" ")}>
                <div className="h-[calc(100dvh_-_240px)] max-xl:h-[calc(100dvh_-_160px)]">{right}</div>
            </div>
        </div>
    );
};
