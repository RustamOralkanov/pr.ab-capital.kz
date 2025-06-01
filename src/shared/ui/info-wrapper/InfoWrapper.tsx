import React from "react";
import { ButtonGroups, type ButtonGroupProps } from "../button-groups/ButtonGroups";
import { useAppSelector } from "@/shared/libs/redux";

interface InfoWrapperProps {
    title?: string | undefined;
    subtitle?: string;
    icon?: string;
    description?: string | undefined;
    buttons?: ButtonGroupProps[];
    onClick?: (id: number | null) => void;
    activeId?: number;
}

export const InfoWrapper: React.FC<InfoWrapperProps> = (props) => {
    const { reverse } = useAppSelector((state) => state?.reverse);

    return (
        <div className="flex flex-col gap-30">
            <div className={["flex flex-col gap-4"].join(" ")}>
                {props.title && <h2 className={[reverse ? "text-right" : "text-left"].join(" ")}>{props.title}</h2>}
                {props.icon && <img src={props.icon} className={["!h-66 !w-fit !object-contain", reverse ? "ml-auto" : "mr-auto"].join(" ")} />}
                {props.subtitle && <h4 className={[reverse ? "text-right" : "text-left"].join(" ")}>{props.subtitle}</h4>}
            </div>
            {props.description && <p className={[reverse ? "text-right" : "text-left"].join(" ")}>{props.description}</p>}
            <ButtonGroups
                activeId={props?.activeId}
                buttons={props?.buttons}
                onClick={(id) => {
                    if (props.onClick) props.onClick(id);
                }}
            />
        </div>
    );
};
