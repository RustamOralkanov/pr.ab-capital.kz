import React from "react";
import { ButtonGroups, type ButtonGroupProps } from "../button-groups/ButtonGroups";
import { useAppSelector } from "@/shared/libs/redux";

interface InfoWrapperProps {
    title: string | undefined;
    subtitle?: string;
    description: string | undefined;
    buttons?: ButtonGroupProps[];
    onClick?: (id: number | null) => void;
}

export const InfoWrapper: React.FC<InfoWrapperProps> = (props) => {
    const { reverse } = useAppSelector((state) => state?.reverse);

    return (
        <div className="flex flex-col gap-30">
            <div className={["flex flex-col gap-4"].join(" ")}>
                <h2 className={[reverse ? "text-right" : "text-left"].join(" ")}>{props.title}</h2>
                {props.subtitle && <h4 className={[reverse ? "text-right" : "text-left"].join(" ")}>{props.subtitle}</h4>}
            </div>
            <p className={[reverse ? "text-right" : "text-left"].join(" ")}>{props.description}</p>
            <ButtonGroups
                buttons={props?.buttons}
                onClick={(id) => {
                    if (props.onClick) props.onClick(id);
                }}
            />
        </div>
    );
};
