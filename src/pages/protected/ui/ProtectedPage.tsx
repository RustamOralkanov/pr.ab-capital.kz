import { MainLayout } from "@/widgets/layout";
import { Spin } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const ProtectedPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const id = Cookies.get("id");

        if (!id) {
            navigate("/");
        } else {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="h-dvh w-dvw flex justify-center items-center">
                <Spin size="large" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <MainLayout />;
};
