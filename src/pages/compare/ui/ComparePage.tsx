import { InnerLayout } from "@/widgets/layout";
import { motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/shared/libs/redux";
import { ClearOutlined } from "@ant-design/icons";
import { clearFavorites } from "@/features/add-to-favorite";
import { InfoWrapper } from "@/shared/ui";

export const ComparePage = () => {
    const dispatch = useAppDispatch();
    const { properties } = useAppSelector((state) => state?.favorite);
    const { reverse } = useAppSelector((state) => state?.reverse);

    return (
        <InnerLayout
            left={
                <div className="flex flex-col gap-30">
                    <InfoWrapper title={"Сравнить"} description={"Просто выберите свой вариант — остальное мы сделаем за вас"} />
                    <button
                        className={[reverse ? "flex-row-reverse" : "", "h-60 flex items-center justify-start button-groups w-full active"].join(" ")}
                        onClick={() => dispatch(clearFavorites())}
                    >
                        <div className="w-60 h-60 flex justify-center items-center relative z-10">
                            <ClearOutlined />
                        </div>
                        <span className="px-20 relative z-10">Очистить</span>
                    </button>
                </div>
            }
            right={
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="p-20 bg-white/5 h-full overflow-auto">
                    <div className="bg-white flex flex-col overflow-auto">
                        <div className="flex items-center">
                            <div className="h-225 min-w-280 flex justify-start items-center p-20 !font-semibold border-b-1 border-b-gray border-r-1 border-r-gray">
                                Сравниваемые планировки
                            </div>
                            {properties.map((plan, index) => (
                                <div key={index} className="h-225 min-w-320 flex justify-start items-center p-20 !font-semibold border-b-1 border-b-gray border-r-1 border-r-gray">
                                    <img src={plan?.plans?.[0]?.image} className="!object-contain" />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <div className="h-58 min-w-280 flex justify-start items-center p-20 !font-semibold border-b-1 border-b-gray border-r-1 border-r-gray">Стоимость</div>
                            {properties.map((plan, index) => (
                                <div key={index} className="h-58 min-w-320 flex justify-start items-center p-20 border-b-1 border-b-gray border-r-1 border-r-gray">
                                    {plan?.price?.toLocaleString()} ₸
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <div className="h-58 min-w-280 flex justify-start items-center p-20 !font-semibold border-b-1 border-b-gray border-r-1 border-r-gray">Цена за м2</div>
                            {properties.map((plan, index) => (
                                <div key={index} className="h-58 min-w-320 flex justify-start items-center p-20 border-b-1 border-b-gray border-r-1 border-r-gray">
                                    {plan?.price_per_meter?.toLocaleString()} ₸
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <div className="h-58 min-w-280 flex justify-start items-center p-20 !font-semibold border-b-1 border-b-gray border-r-1 border-r-gray">Комнатность</div>
                            {properties.map((plan, index) => (
                                <div key={index} className="h-58 min-w-320 flex justify-start items-center p-20 border-b-1 border-b-gray border-r-1 border-r-gray">
                                    {plan?.rooms}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <div className="h-58 min-w-280 flex justify-start items-center p-20 !font-semibold border-b-1 border-b-gray border-r-1 border-r-gray">Площадь</div>
                            {properties.map((plan, index) => (
                                <div key={index} className="h-58 min-w-320 flex justify-start items-center p-20 border-b-1 border-b-gray border-r-1 border-r-gray">
                                    {plan?.size} м2
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <div className="h-58 min-w-280 flex justify-start items-center p-20 !font-semibold border-b-1 border-b-gray border-r-1 border-r-gray">Отделка</div>
                            {properties.map((plan, index) => (
                                <div key={index} className="h-58 min-w-320 flex justify-start items-center p-20 border-b-1 border-b-gray border-r-1 border-r-gray">
                                    {plan?.facing}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <div className="h-58 min-w-280 flex justify-start items-center p-20 !font-semibold border-b-1 border-b-gray border-r-1 border-r-gray">Дата сдачи</div>
                            {properties.map((plan, index) => (
                                <div key={index} className="h-58 min-w-320 flex justify-start items-center p-20 border-b-1 border-b-gray border-r-1 border-r-gray">
                                    {`${plan?.house?.check_in_year}/${plan?.house?.check_in_quarter}`}
                                </div>
                            ))}
                        </div>
                        {/* <table className="compare-table">
                            <tbody>
                                <tr>
                                    <td width={320}>Сравниваемые планировки</td>
                                    {properties.map((plan, index) => (
                                        <td key={index}>
                                            <img src={plan?.plans?.[0]?.image} />
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Стоимость</td>
                                    {properties.map((plan, index) => (
                                        <td key={index}>{plan.price ? plan.price.toLocaleString() + " ₸" : "n/d"}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Цена за м2</td>
                                    {properties.map((plan, index) => (
                                        <td key={index}>{plan.price_per_meter ? plan.price_per_meter.toLocaleString() + " ₸" : "n/d"}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Комнатность</td>
                                    {properties.map((plan, index) => (
                                        <td key={index}>{plan.rooms}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Площадь</td>
                                    {properties.map((plan, index) => (
                                        <td key={index}>{plan.size + " м2"}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Отделка</td>
                                    {properties.map((plan, index) => (
                                        <td key={index}>{plan.facing}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Дата сдачи</td>
                                    {properties.map((plan, index) => (
                                        <td key={index}>{`${plan.house.check_in_year} / ${plan.house.check_in_quarter} кв`}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table> */}
                    </div>
                </motion.div>
            }
        />
    );
};
