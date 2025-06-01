import { useAppSelector } from "@/shared/libs/redux";
import { Header } from "@/widgets/header";
import { useLocation } from "react-router";
import { Outlet } from "react-router";

export const MainLayout = () => {
    const { publicationType } = useAppSelector((state) => state?.publicationType);
    const { pathname } = useLocation();

    return (
        <section
            className="h-dvh w-full p-40 max-xl:p-20"
            style={{
                background:
                    publicationType === "commerce" && pathname !== "/home"
                        ? "radial-gradient(103.75% 122.6% at 0% 0%, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 100%), #0D1114"
                        : "radial-gradient(103.75% 122.6% at 0% 0%, rgba(209, 216, 35, 0.2) 0%, rgba(209, 216, 35, 0) 100%), rgba(13, 17, 20, 1)",
                backgroundBlendMode: "screen",
            }}
        >
            <Header />
            <Outlet />
        </section>
    );
};
