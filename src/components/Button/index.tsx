import "./index.css";

import type React from "react";
import { Icon, type IconName } from "../Icon";
import { GyampoComponent, type GyampoComponentProps } from "../Component";


export const ButtonVariants = {
    StandardButton: "StandardButton",
    TextButton: "TextButton",
    IconButton: "IconButton"
} as const;

type ButtonVariants = {
    [k in keyof typeof ButtonVariants]: typeof ButtonVariants[k]
};

export type ButtonVariant = ButtonVariants[keyof ButtonVariants];

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    icon?: IconName;
    variant?: ButtonVariant
};

export const Button = (props: GyampoComponentProps<ButtonProps>) => {
    const {
        classNameList = [],
        variant = "StandardButton",
        children,
        text,
        icon,
        ...builtinProps
    } = props;

    const hasText = (variant === "StandardButton" || variant === "TextButton") && text;
    const hasIcon = (variant === "StandardButton" || variant === "IconButton") && icon;

    return <GyampoComponent
        {...builtinProps}
        as="button"
        classNameList={[...classNameList, "Button", variant ? `Button--${variant}` : ""]}>

        {children || <>
            {hasIcon && icon && <Icon name={icon} />}

            {hasText
                && <span
                    data-text={text}
                    className="Button__text">
                    {text}
                </span>}
        </>}

    </GyampoComponent >
}