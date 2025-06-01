import { Reverse } from "@/entities/reverse";
import { useGetProjectsQuery } from "@/shared/api/projects";
import { useFullScreen } from "@/shared/hooks/useFullScreen";
import { ABIcon } from "@/shared/icons/ABIcon";
import { ChevronIcon } from "@/shared/icons/ChevronIcon";
import { FullScreenIcon, GenplanIcon, HomeIcon } from "@/shared/icons/HeaderIcons";
import { useAppSelector } from "@/shared/libs/redux";
import { APP_ROUTES } from "@/shared/routes";
import { Form, Select } from "antd";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router";

export const Header = () => {
    const [form] = Form.useForm();
    const { reverse } = useAppSelector((state) => state?.reverse);
    const { handleFullscreen } = useFullScreen();
    const { pathname } = useLocation();
    const { project, publication_type } = useParams();
    const { data: projects } = useGetProjectsQuery({}, { skip: pathname.includes(APP_ROUTES.ABOUT_COMPANY) });
    const navigate = useNavigate();

    const isHome = pathname.replace("/", "") === APP_ROUTES.HOME;

    const handleChangeProject = (newAlias: string) => {
        const pathParts = pathname.split("/").filter(Boolean); // ['main', 'baitas', 'about']

        if (pathParts.length >= 2) {
            const publicationType = pathParts[0];
            const rest = pathParts.slice(2); // всё, что после project

            const newPath = `/${publicationType}/${newAlias}/${rest.join("/")}`;
            navigate(newPath);
        }
    };

    useEffect(() => {
        if (project) form.setFieldValue("project", project);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <header className="pb-20 border-b-1 border-b-green">
            <div className={[reverse ? "flex-row-reverse" : "flex-row", "flex items-center justify-between"].join(" ")}>
                <div className={[reverse ? "flex-row-reverse" : "flex-row", "flex items-center"].join(" ")}>
                    <Link to={`/${APP_ROUTES.HOME}`}>
                        <ABIcon height={35} width={114} className={[reverse ? "ml-50" : "mr-50"].join(" ")} />
                    </Link>
                    <NavLink
                        to={`/${APP_ROUTES.HOME}`}
                        className={({ isActive }) =>
                            [
                                isActive ? "!text-black !bg-green" : "!text-white",
                                "w-60 h-60 flex justify-center items-center !transition-all !duration-300 hover:!bg-green hover:!text-black",
                            ].join(" ")
                        }
                    >
                        <HomeIcon />
                    </NavLink>
                    <button
                        className="w-60 h-60 flex justify-center items-center !text-white !transition-all !duration-300 hover:!bg-green hover:!text-black"
                        onClick={handleFullscreen}
                    >
                        <FullScreenIcon />
                    </button>
                    {!isHome && !pathname.includes(APP_ROUTES.ABOUT_COMPANY) && (
                        <NavLink
                            to={`/${publication_type}/${project}/${APP_ROUTES.PROPERTIES}`}
                            className="w-60 h-60 flex justify-center items-center !text-white !transition-all !duration-300 hover:!bg-green hover:!text-black"
                        >
                            <GenplanIcon />
                        </NavLink>
                    )}
                    {!isHome && !pathname.includes(APP_ROUTES.ABOUT_COMPANY) && (
                        <Form className="max-w-280 w-280" form={form}>
                            <Form.Item name="project">
                                <Select
                                    options={projects?.map((project) => ({
                                        label: project.title,
                                        value: project.alias,
                                    }))}
                                    placeholder="Проект"
                                    defaultActiveFirstOption
                                    className="w-full"
                                    onChange={(value) => handleChangeProject(value)}
                                    suffixIcon={<ChevronIcon className="!text-gray" />}
                                    classNames={{ root: "custom-select", popup: { root: "custom-list" } }}
                                />
                            </Form.Item>
                        </Form>
                    )}
                </div>
                <Reverse />
            </div>
        </header>
    );
};
