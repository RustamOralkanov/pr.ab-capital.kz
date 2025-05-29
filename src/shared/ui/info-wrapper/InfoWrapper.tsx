import React from "react";
import { ButtonGroups, type ButtonGroupProps } from "../button-groups/ButtonGroups";

interface InfoWrapperProps {
    title: string | undefined;
    subtitle?: string;
    description: string | undefined;
    buttons?: ButtonGroupProps[];
    onClick?: (id: number | null) => void;
}

export const InfoWrapper: React.FC<InfoWrapperProps> = (props) => {
    return (
        <div className="flex flex-col gap-30">
            <div className="flex flex-col gap-4">
                <h2>{props.title}</h2>
                {props.subtitle && <h4>{props.subtitle}</h4>}
            </div>
            <p>{props.description}</p>
            <ButtonGroups
                buttons={props?.buttons}
                onClick={(id) => {
                    if (props.onClick) props.onClick(id);
                }}
            />
        </div>
    );
};
