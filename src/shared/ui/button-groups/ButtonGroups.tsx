import { useEffect, useState } from "react";
import { useAppSelector } from "@/shared/libs/redux";
import "./ButtonGroups.scss";

export interface ButtonGroupProps {
    id: number;
    title: string;
    icon: string;
    type: string;
}

export const ButtonGroups: React.FC<{ buttons?: ButtonGroupProps[]; onClick: (id: number | null) => void; activeId?: number }> = ({ buttons, onClick, activeId }) => {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const { reverse } = useAppSelector((state) => state?.reverse);

    useEffect(() => {
        if (activeId) setCurrentIndex(activeId);
    }, [activeId]);

    if (buttons)
        return (
            <div className="flex flex-col">
                {buttons.length > 0 &&
                    buttons?.map((button) => (
                        <button
                            key={button.id}
                            className={[
                                "h-60 flex items-center justify-start button-groups",
                                currentIndex === button.id ? "active" : "",
                                reverse ? "flex-row-reverse reverse" : "",
                            ].join(" ")}
                            onClick={() => {
                                const isSame = currentIndex === button.id;
                                setCurrentIndex(isSame ? null : button.id);
                                onClick(isSame ? null : button.id);
                            }}
                        >
                            {button?.icon && (
                                <div className="w-60 h-60 flex justify-center items-center relative z-10">
                                    <img src={button?.icon} alt="icon" className="!w-24 !h-24 object-contain" />
                                </div>
                            )}
                            <span className="px-20 relative z-10">{button.title}</span>
                        </button>
                    ))}
            </div>
        );
};
