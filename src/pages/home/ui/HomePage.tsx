import { useGetAboutPagesQuery } from "@/shared/api/about-pages";
import { useGetMsBannersQuery } from "@/shared/api/ms-home";
import { useGetPagesQuery } from "@/shared/api/pages";
import { useGetProjectsQuery } from "@/shared/api/projects";
import { useCarousel } from "@/shared/hooks/useCarousel";
import { CarouselArrowIcon } from "@/shared/icons/CarouselArrow";
import { PlayIcon } from "@/shared/icons/PlayIcon";
import { useAppSelector } from "@/shared/libs/redux";
import { APP_ROUTES } from "@/shared/routes";
import { Carousel } from "antd";
import { Link } from "react-router";

export const HomePage = () => {
    const { publicationType } = useAppSelector((state) => state?.publicationType);
    const { data } = useGetPagesQuery({ slug: "main" });
    const { data: projects } = useGetProjectsQuery({});
    const { data: banners } = useGetMsBannersQuery({});
    const { data: abouts } = useGetAboutPagesQuery({});

    const { carouselRef, prevSlide, nextSlide } = useCarousel();

    return (
        <section>
            <div className="grid grid-cols-12 border-b-1 border-b-green mb-40 h-[calc(100dvh_-_500px)] max-xl:h-[calc(100dvh_-_440px)] max-lg:h-auto max-xl:mb-20 overflow-hidden max-lg:grid-cols-1 max-lg:border-b-0">
                <div className="col-span-3 max-xl:col-span-4 border-r-1 border-r-green relative max-lg:col-span-1 max-lg:border-r-0">
                    <img src="/bg.svg" alt="bg" className="absolute top-0 left-0 max-lg:hidden" />
                    <div className="flex flex-col gap-30 pt-40 max-w-400 relative z-10 pr-40">
                        <img src={abouts?.[0]?.icon} alt="icon" className="!h-66 !w-fit !object-contain" />
                        <p className="line-clamp-5 max-lg:line-clamp-none">{abouts?.[0]?.subtitle}</p>
                    </div>
                    <Link
                        to={`/${APP_ROUTES.ABOUT_COMPANY}/${abouts?.[0]?.alias}`}
                        className="flex items-center gap-8 !text-white/60 !font-[300] absolute right-0 bottom-0 z-10 max-lg:relative max-lg:mt-30"
                    >
                        Узнать о компании
                        <div className="w-60 min-w-60 h-60 flex justify-center items-center bg-green max-lg:hidden">
                            <PlayIcon className="!text-black" />
                        </div>
                    </Link>
                </div>
                <div className="col-span-6 max-xl:col-span-8 max-lg:hidden">
                    <div className="w-full h-[calc(100dvh_-_500px)] max-xl:h-[calc(100dvh_-_440px)] relative">
                        <img src={data?.main_image} alt="main-image" className="w-full h-full object-cover" />
                        <div className="absolute bg-gradient-to-t from-black to-transparent bottom-0 left-0 h-200 w-full"></div>
                        <div className="flex flex-col gap-12 absolute left-40 bottom-40 max-w-464 z-10">
                            <h3 className="!text-[32px] text-white !font-semibold leading-[1]">{data?.title}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 border-l-1 border-l-green max-xl:hidden">
                    <div className="flex flex-col gap-20 pl-40 py-40">
                        <div className="">
                            <Carousel dots={false} ref={carouselRef}>
                                {banners?.map((banner) => (
                                    <div key={banner?.id}>
                                        <img src={banner?.file_mobile} alt="banner" className="!object-cover !object-top !h-[calc(100dvh_-_650px)]" />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className="flex items-center justify-end">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <button className="w-50 h-50 flex items-center justify-center arrow-button" onClick={() => prevSlide()}>
                                        <CarouselArrowIcon className="rotate-180 !text-green" />
                                    </button>
                                    <button className="w-50 h-50 flex items-center justify-center arrow-button" onClick={() => nextSlide()}>
                                        <CarouselArrowIcon className="!text-green" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 max-lg:grid-cols-1 max-lg:mt-40">
                <div className="col-span-3 max-lg:hidden">
                    <div className="w-full h-300 relative">
                        <img src="/map.webp" alt="map" className="w-full h-full object-cover" />
                        <Link to={`/${APP_ROUTES.MAP}`} className="absolute left-0 bottom-0 !bg-green w-full flex justify-center items-center h-50">
                            <span className="text-center text-black">Посмотреть на карте</span>
                        </Link>
                    </div>
                </div>
                <div className="col-span-9 -ml-10 max-lg:col-span-1 max-lg:-ml-5">
                    <Carousel dots={false} variableWidth draggable infinite={false}>
                        <div className="!hidden max-lg:!block">
                            <div className="w-290 h-300 relative px-5">
                                <img src="/map.webp" alt="map" className="w-full h-full object-cover" />
                                <Link to={`/${APP_ROUTES.MAP}`} className="absolute left-5 bottom-0 !bg-green w-[calc(100%_-_10px)] flex justify-center items-center h-50">
                                    <span className="text-center text-black">Посмотреть на карте</span>
                                </Link>
                            </div>
                        </div>
                        {projects?.map((project, i) => (
                            <div key={i}>
                                <Link to={`/${publicationType}/${project?.alias}/${APP_ROUTES.ABOUT}`} className="w-450 max-lg:w-280 px-10 flex flex-col gap-12 max-lg:px-5">
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
                                        <div className="flex items-center gap-2 max-lg:hidden">
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
            <div className="mt-40 hidden max-lg:!block">
                <Carousel dots={false} ref={carouselRef}>
                    {banners?.map((banner) => (
                        <div key={banner?.id}>
                            <img src={banner?.file_mobile} alt="banner" className="!object-cover !object-top " />
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};
