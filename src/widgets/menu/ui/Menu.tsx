import { Popover } from "antd";
import { MenuIcon } from "@/shared/icons/MenuIcon";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router";
import { APP_ROUTES } from "@/shared/routes";
import { useGetMenuQuery } from "@/shared/api/menu";
import { useAppDispatch, useAppSelector } from "@/shared/libs/redux";
import { useGetAboutPagesQuery } from "@/shared/api/about-pages";
import { setPublicationType } from "@/features/publication-type";

export const Menu = () => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const dispatch = useAppDispatch();
    const { publicationType } = useAppSelector((state) => state?.publicationType);
    const { reverse } = useAppSelector((state) => state?.reverse);

    const { project, publication_type } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [width, setWidth] = useState<number | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);

    const { data } = useGetMenuQuery({ project, publication_type }, { skip: pathname.includes(APP_ROUTES.ABOUT_COMPANY) });
    const { data: aboutPages } = useGetAboutPagesQuery({}, { skip: !pathname.includes(APP_ROUTES.ABOUT_COMPANY) });

    useEffect(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setWidth(rect.width);
        }
    }, []);

    const aboutItems = [
        ...(aboutPages?.map((page) => ({
            title: page?.title,
            path: `/${APP_ROUTES.ABOUT_COMPANY}/${page?.alias}`,
        })) || []),
        {
            title: "Объекты",
            path: `/${APP_ROUTES.ABOUT_COMPANY}/${APP_ROUTES?.PROJECTS}`,
        },
    ];

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
        if (value.includes(APP_ROUTES.ABOUT) && !value.includes(APP_ROUTES.ABOUT_COMPANY)) return "О проекте";
        if (value.includes(APP_ROUTES.LOCATIONS)) return "Расположение";
        if (value.includes(APP_ROUTES.GENPLANS)) return "Генплан";
        if (value.includes(`/${APP_ROUTES.ABOUT_COMPANY}/${APP_ROUTES.PROJECTS}`)) return "Объекты";

        const currentPage = data?.find((menu) => value.includes(menu?.alias))?.title;
        const currentAboutPage = aboutPages?.find((menu) => value.includes(menu?.alias))?.title;

        return pathname.includes(APP_ROUTES.ABOUT_COMPANY) ? currentAboutPage : currentPage;
    };

    const switchPublicationTypeAndNavigate = (newType: "main" | "commerce") => {
        const pathSegments = pathname.split("/").filter(Boolean);

        // Заменить publicationType в URL (первый сегмент)
        if (pathSegments.length > 0) {
            pathSegments[0] = newType;
            const newPath = "/" + pathSegments.join("/");

            dispatch(setPublicationType(newType));
            navigate(newPath, { replace: true }); // `replace` — чтобы не копить историю
        }
    };

    return (
        <Popover
            open={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
            placement="topLeft"
            content={
                <div className="flex flex-col gap-20 bg-black/30">
                    {!pathname.includes(APP_ROUTES.ABOUT_COMPANY) && (
                        <div className="flex items-center">
                            <button
                                className={["w-full h-60 !font-semibold transition-all duration-300", publicationType === "main" ? "text-black bg-green" : "text-white"].join(" ")}
                                onClick={() => switchPublicationTypeAndNavigate("main")}
                            >
                                Основной
                            </button>
                            <button
                                className={["w-full h-60 !font-semibold transition-all duration-300", publicationType === "commerce" ? "text-black bg-green" : "text-white"].join(
                                    " "
                                )}
                                onClick={() => switchPublicationTypeAndNavigate("commerce")}
                            >
                                Коммерция
                            </button>
                        </div>
                    )}
                    <div className="flex flex-col">
                        {!pathname.includes(APP_ROUTES.ABOUT_COMPANY) &&
                            menuItems?.map((item, i) => (
                                <NavLink
                                    to={item.path}
                                    key={i}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        ["h-60 flex items-center justify-start button-groups", isActive ? "active" : "", reverse ? "flex-row-reverse reverse" : ""].join(" ")
                                    }
                                >
                                    {item?.icon && (
                                        <div className="w-60 h-60 flex justify-center items-center relative z-10">
                                            <img src={item?.icon} alt="icon" className="!w-24 !h-24 object-contain" />
                                        </div>
                                    )}
                                    <span className="px-20 relative z-10">{item.title}</span>
                                </NavLink>
                            ))}
                        {pathname.includes(APP_ROUTES.ABOUT_COMPANY) &&
                            aboutItems?.map((item, i) => (
                                <NavLink
                                    to={item?.path}
                                    key={i}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        ["h-60 flex items-center justify-start button-groups", isActive ? "active" : "", reverse ? "flex-row-reverse reverse" : ""].join(" ")
                                    }
                                >
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
            <button className={[reverse ? "flex-row-reverse" : "", "absolute bottom-0 left-0 w-full flex items-center cursor-pointer"].join(" ")} ref={buttonRef}>
                <div className="min-w-60 h-60 justify-center flex items-center bg-green">
                    <MenuIcon />
                </div>
                <div className={[reverse ? "justify-end" : "", "h-60 w-full px-20 flex items-center uppercase !font-semibold text-white"].join(" ")}>{setMenuTitle(pathname)}</div>
            </button>
        </Popover>
    );
};
