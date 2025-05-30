import { InnerLayout } from "@/widgets/layout";
import { motion } from "motion/react";
import { Link, useParams } from "react-router";
import { useAppSelector } from "@/shared/libs/redux";
import { APP_ROUTES } from "@/shared/routes";
import { CompareIcon } from "@/shared/icons/HeaderIcons";
import { ComplexCard } from "@/entities/complex-card";
import { InfoWrapper } from "@/shared/ui";

export const FavoritesPage = () => {
    const { properties } = useAppSelector((state) => state?.favorite);
    const { project, publication_type } = useParams();
    const { reverse } = useAppSelector((state) => state?.reverse);

    return (
        <InnerLayout
            left={
                <div className="flex flex-col gap-30">
                    <InfoWrapper title={"Избранное"} description={"Просто выберите свой вариант — остальное мы сделаем за вас"} />
                    <Link to={`/${publication_type}/${project}/${APP_ROUTES.COMPARE}`} className="w-full">
                        <button className={[reverse ? "flex-row-reverse" : "", "h-60 flex items-center justify-start button-groups w-full active"].join(" ")}>
                            <div className="w-60 h-60 flex justify-center items-center relative z-10">
                                <CompareIcon className="rotate-90" />
                            </div>
                            <span className="px-20 relative z-10">Сравнить</span>
                        </button>
                    </Link>
                </div>
            }
            right={
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="p-20 bg-white/5 h-full overflow-auto">
                    <div className="grid grid-cols-12 gap-20">
                        {properties?.map((property) => (
                            <div className="col-span-3" key={property?.id}>
                                <ComplexCard property={property} />
                            </div>
                        ))}
                    </div>
                </motion.div>
            }
        />
    );
};
