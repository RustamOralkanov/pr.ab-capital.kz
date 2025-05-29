import type { ReactNode } from "react";
import { Menu } from "../menu";
import { useLocation, useNavigate } from "react-router";
import { APP_ROUTES } from "@/shared/routes";
import { ChevronIcon } from "@/shared/icons/ChevronIcon";

export const InnerLayout: React.FC<{ left: ReactNode; right: ReactNode }> = ({ left, right }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isProperties = pathname?.includes(APP_ROUTES.PROPERTIES);

    return (
        <div className="grid grid-cols-12 gap-40 py-40 border-b-1 border-b-green h-[calc(100dvh_-_160px)] max-xl:h-[calc(100dvh_-_120px)] max-xl:py-20 max-xl:gap-20">
            <div className="col-span-3 max-xl:col-span-4 relative">
                <div className="flex flex-col justify-between overflow-auto h-[calc(100dvh_-_320px)] max-xl:h-[calc(100dvh_-_240px)]">
                    {left}
                    {isProperties ? (
                        <button className="absolute bottom-0 left-0 w-full flex items-center cursor-pointer" onClick={() => navigate(-1)}>
                            <div className="min-w-60 h-60 justify-center flex items-center bg-green">
                                <ChevronIcon className="rotate-90" />
                            </div>
                            <div className="h-60 w-full px-20 flex items-center uppercase !font-semibold text-white">Назад</div>
                        </button>
                    ) : (
                        <Menu />
                    )}
                </div>
            </div>
            <div className="col-span-9 max-xl:col-span-8">
                <div className="h-[calc(100dvh_-_240px)] max-xl:h-[calc(100dvh_-_160px)]">{right}</div>
            </div>
        </div>
    );
};
