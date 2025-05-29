import { CheckOutlined } from "@ant-design/icons";
import { Form, Spin } from "antd";
import { usePostLoginMutation } from "../api";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "@/shared/routes";

export const EntryPage = () => {
    const [form] = Form.useForm();
    const [login] = usePostLoginMutation();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const id = Form.useWatch("id", form);

    const handleClick = (number: number) => () => {
        if (id?.length < 6) {
            form.setFieldValue("id", id + String(number));
        }
    };

    const handleClear = () => {
        if (id) {
            form.setFieldValue("id", id.slice(0, -1));
        }
    };

    useEffect(() => {
        const id = Cookies.get("id");
        if (id) {
            navigate("/" + APP_ROUTES.HOME);
        }
    }, [navigate]);

    const onFinish = async (values: { id: string }) => {
        setIsLoading(true);
        try {
            await login(values).unwrap();
            setIsLoading(false);
            Cookies.set("id", values.id);
            navigate("/" + APP_ROUTES.HOME);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            form.setFields([
                {
                    name: "id",
                    errors: ["Неверный ID, попробуйте еще раз!"],
                },
            ]);
        }
    };

    return (
        <section
            className="w-screen h-dvh flex items-center relative overflow-clip"
            style={{
                background: "radial-gradient(103.75% 122.6% at 0% 0%, rgba(209, 216, 35, 0.2) 0%, rgba(209, 216, 35, 0) 100%), rgba(13, 17, 20, 1)",
                backgroundBlendMode: "screen",
            }}
        >
            <img src="/auth-bg.svg" alt="bg" className="absolute top-0 right-0 w-full h-full object-cover" />
            <div className="grid grid-cols-12 gap-40 w-full relative z-10 max-lg:grid-cols-2 max-lg:mx-20">
                <div className="col-span-5 max-lg:hidden">
                    <div className="bg-green min-h-270 h-full px-50 py-40">
                        <div className="flex flex-col gap-8 max-w-360 ml-auto">
                            <h2 className="!text-black text-5xl">Введите user ID</h2>
                            <p className="!text-black">Данные user ID доступны в CRM системе во вкладке личного кабинета </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 max-lg:flex max-lg:flex-col max-lg:items-center">
                    <div className="hidden flex-col gap-8 max-w-360 mx-auto mb-40 max-lg:flex">
                        <h2 className="text-white text-center text-3xl">Введите user ID</h2>
                        <p className="text-white text-center">Данные user ID доступны в CRM системе во вкладке личного кабинета </p>
                    </div>
                    <Spin spinning={isLoading}>
                        <Form className="max-lg:max-w-360" form={form} onFinish={onFinish}>
                            <div className="grid grid-cols-3 gap-5">
                                <div className="col-span-3 relative">
                                    <Form.Item name="id" rules={[{ required: true, message: "Пожалуйста, введите ваш код" }]} initialValue={""}>
                                        <input className="blur-20 h-50 w-full rounded-0 bg-white/5 text-center text-white text-[30px]" type="password" maxLength={6} />
                                    </Form.Item>
                                    <div className="absolute top-16 right-14 cursor-pointer" onClick={handleClear}>
                                        <img src="/cancel.svg" alt="cancel" />
                                    </div>
                                </div>
                                {[...Array(9)].map((_, index) => (
                                    <div className="col-span-1" key={index}>
                                        <button
                                            className="blur-20 h-50 w-full rounded-0 bg-white/5 text-center text-white text-[30px] cursor-pointer hover:bg-green hover:text-black transition-all duration-300"
                                            onClick={handleClick(index + 1)}
                                            type="button"
                                        >
                                            {index + 1}
                                        </button>
                                    </div>
                                ))}
                                <div className="col-span-1">
                                    <button className="h-50 w-full flex justify-center items-center" type="button">
                                        <img src="/dial-pad.svg" className="!object-contain" />
                                    </button>
                                </div>
                                <div className="col-span-1">
                                    <button
                                        className="blur-20 h-50 w-full rounded-0 bg-white/5 text-center text-white text-[30px] cursor-pointer hover:bg-green hover:text-black transition-all duration-300"
                                        onClick={handleClick(0)}
                                        type="button"
                                    >
                                        0
                                    </button>
                                </div>
                                <div className="col-span-1">
                                    <button className="h-50 w-full rounded-0 cursor-pointer bg-green transition-all duration-300" type="submit">
                                        <CheckOutlined className="text-2xl" />
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </Spin>
                </div>
            </div>
        </section>
    );
};
