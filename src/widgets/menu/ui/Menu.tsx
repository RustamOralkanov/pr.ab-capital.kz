import { Popover } from "antd";
import { MenuIcon } from "@/shared/icons/MenuIcon";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router";
import { APP_ROUTES } from "@/shared/routes";
import { useGetMenuQuery } from "@/shared/api/menu";

export const Menu = () => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const { project, publication_type } = useParams();
    const { pathname } = useLocation();

    const [width, setWidth] = useState<number | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);

    const { data } = useGetMenuQuery({ project, publication_type });

    useEffect(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setWidth(rect.width);
        }
    }, []);

    const menuItems = [
        {
            icon: "/home.svg",
            title: "Проект",
            path: `/${publication_type}/${project}/${APP_ROUTES.ABOUT}`,
        },
        ...(data?.map((menu) => ({
            icon: menu?.icon,
            title: menu?.title,
            path: `/${publication_type}/${project}/${menu?.alias}`,
        })) || []),
    ];

    const setMenuTitle = (value: string) => {
        if (value.includes(APP_ROUTES.ABOUT)) return "О проекте";
        if (value.includes(APP_ROUTES.LOCATIONS)) return "Расположение";
        if (value.includes(APP_ROUTES.GENPLANS)) return "Генплан";

        const currentPage = data?.find((menu) => value.includes(menu?.alias))?.title;

        return currentPage;
    };

    return (
        <Popover
            open={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
            placement="topLeft"
            content={
                <div className="flex flex-col gap-20 bg-black/30">
                    <div className="flex items-center">
                        <button className="w-full h-60 !font-semibold text-black bg-green">Основной</button>
                        <button className="w-full h-60 !font-semibold text-white">Коммерция</button>
                    </div>
                    <div className="flex flex-col">
                        {menuItems?.map((item, i) => (
                            <NavLink
                                to={item.path}
                                key={i}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => ["h-60 flex items-center justify-start button-groups", isActive ? "active" : ""].join(" ")}
                            >
                                {item?.icon && (
                                    <div className="w-60 h-60 flex justify-center items-center relative z-10">
                                        <img src={item?.icon} alt="icon" className="!w-24 !h-24 object-contain" />
                                    </div>
                                )}
                                <span className="px-20 relative z-10">{item.title}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            }
            arrow={false}
            trigger={"click"}
            styles={{ root: { width } }}
            classNames={{ body: "!p-0 !bg-white/5 !backdrop-blur-sm" }}
        >
            <button className="absolute bottom-0 left-0 w-full flex items-center cursor-pointer" ref={buttonRef}>
                <div className="min-w-60 h-60 justify-center flex items-center bg-green">
                    <MenuIcon />
                </div>
                <div className="h-60 w-full px-20 flex items-center uppercase !font-semibold text-white">{setMenuTitle(pathname)}</div>
            </button>
        </Popover>
    );
};
