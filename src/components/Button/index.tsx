import type React from "react";
import type { ReactElement } from "react";
import { GyampoComponent, type GyampoBaseComponentProps } from "../Component";
import { type GyampoIconComponent } from "../Icon";
import "./index.css";

export const ButtonVariants = {
    StandardButton: "StandardButton",
    TextButton: "TextButton",
    IconButton: "IconButton",
    StandardButtonReversed: "StandardButtonReversed"
} as const;

type ButtonVariants = {
    [k in keyof typeof ButtonVariants]: typeof ButtonVariants[k]
};

export type ButtonVariant = ButtonVariants[keyof ButtonVariants];

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    Icon?: ReactElement<GyampoIconComponent>;
    variant?: ButtonVariant
};

export const Button = (props: GyampoBaseComponentProps<ButtonProps>) => {
    const {
        classNameList = [],
        variant = "StandardButton",
        children,
        text,
        Icon,
        ...builtinProps
    } = props;

    const hasText = (variant === "StandardButton"
        || variant === "StandardButtonReversed"
        || variant === "TextButton"
    ) && text;

    const hasIcon = (variant === "StandardButton"
        || variant === "StandardButtonReversed"
        || variant === "IconButton"
    ) && Icon;

    return <GyampoComponent
        {...builtinProps}
        as="button"
        classNameList={[...classNameList, "Button", variant ? `Button--${variant}` : ""]}>
        {children || <>
            {hasIcon
                && <GyampoComponent
                    as="span"
                    classNameList={["Button__icon"]} >
                    {Icon}
                </GyampoComponent>}

            {hasText
                && <span
                    data-text={text}
                    className="Button__text">
                    {text}
                </span>}
        </>}
    </GyampoComponent >
}