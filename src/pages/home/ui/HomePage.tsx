import { useGetPagesQuery } from "@/shared/api/pages";
import { useGetProjectsQuery } from "@/shared/api/projects";
import { APP_ROUTES } from "@/shared/routes";
import { Carousel } from "antd";
import { Link } from "react-router";

export const HomePage = () => {
    const { data } = useGetPagesQuery({ slug: "main" });
    const { data: projects } = useGetProjectsQuery({});

    return (
        <section className="">
            <div className="grid grid-cols-12 border-b-1 border-b-green mb-40 h-[calc(100dvh_-_500px)] max-xl:h-[calc(100dvh_-_440px)] max-xl:mb-20 overflow-hidden">
                <div className="col-span-3 max-xl:col-span-4 border-r-1 border-r-green"></div>
                <div className="col-span-6 max-xl:col-span-8">
                    <div className="w-full h-[calc(100dvh_-_500px)] max-xl:h-[calc(100dvh_-_440px)] relative">
                        <img src={data?.main_image} alt="main-image" className="w-full h-full object-cover" />
                        <div className="absolute bg-gradient-to-t from-black to-transparent bottom-0 left-0 h-200 w-full"></div>
                        <div className="flex flex-col gap-12 absolute left-40 bottom-40 max-w-464 z-10">
                            <h3 className="!text-[32px] text-white !font-semibold leading-[1]">{data?.title}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 border-l-1 border-l-green max-xl:hidden"></div>
            </div>
            <div className="grid grid-cols-12 gap-20">
                <div className="col-span-3">
                    <div className="w-full h-300 relative">
                        <img src="/map.webp" alt="map" className="w-full h-full object-cover" />
                        <Link to={`/${APP_ROUTES.MAP}`} className="absolute left-0 bottom-0 !bg-green w-full flex justify-center items-center h-50">
                            <span className="text-center text-black">Посмотреть на карте</span>
                        </Link>
                    </div>
                </div>
                <div className="col-span-9 -ml-10">
                    <Carousel dots={false} variableWidth draggable infinite={false}>
                        {projects?.map((project, i) => (
                            <div key={i}>
                                <Link to={`/main/${project?.alias}/${APP_ROUTES.ABOUT}`} className="w-450 px-10 flex flex-col gap-12">
                                    <div className="h-260 relative">
                                        <img src={project?.images?.[0]?.image} alt={project?.alias} className="w-full h-full object-cover" />
                                        <div className="flex items-center gap-3 absolute top-20 left-20">
                                            {["/arrow.svg", "/navigate.svg"].map((item, i) => (
                                                <div className="w-40 h-40 rounded-full flex justify-center items-center bg-[#83838340]" key={i}>
                                                    <img src={item} alt="item" className={["!object-contain", i === 0 ? "!w-16 !h-16" : "!w-24 !h-24"].join(" ")} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="px-8 flex items-center justify-between">
                                        <h3>{project?.title}</h3>
                                        <div className="flex items-center gap-2">
                                            {[project?.project_class, project?.project_stage].map((item, i) => (
                                                <div className="h-26 px-6 flex items-center !text-xs leading-[1] text-white !font-light bg-[#83838320]" key={i}>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    );
};
