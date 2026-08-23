import type React from "react";
import type { ReactElement } from "react";
import { GyampoComponent, type GyampoBaseComponentProps } from "../../GyampoComponent/GyampoComponent";
import { type GyampoIconComponent } from "../../GyampoIcon/GyampoIcon";
import "./Button.css";

export const TropicaMenuButtonVariants = {
    StandardButton: "StandardButton",
    TextButton: "TextButton",
    IconButton: "IconButton",
    StandardButtonReversed: "StandardButtonReversed"
} as const;

type TropicaMenuButtonVariants = {
    [k in keyof typeof TropicaMenuButtonVariants]: typeof TropicaMenuButtonVariants[k]
};

export type ButtonVariant = TropicaMenuButtonVariants[keyof TropicaMenuButtonVariants];

export interface TropicaMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    PrimaryIcon?: ReactElement<GyampoIconComponent>;
    SecondaryIcon?: ReactElement<GyampoIconComponent>;
    variant?: ButtonVariant;
};

export const TropicaMenuButton = (props: GyampoBaseComponentProps<TropicaMenuButtonProps>) => {
    const {
        classNameList = [],
        variant = "StandardButton",
        children,
        text,
        PrimaryIcon,
        SecondaryIcon,
        ...builtinProps
    } = props;

    const hasText = (variant === "StandardButton"
        || variant === "StandardButtonReversed"
        || variant === "TextButton"
    ) && text;

    return <GyampoComponent
        {...builtinProps}
        as="button"
        classNameList={[
            ...classNameList,
            "TropicaMenuButton",
            variant ? `TropicaMenuButton--${variant}` : ""
        ]}>
        {children || <>
            {variant !== "TextButton" && PrimaryIcon
                && <GyampoComponent
                    as="span"
                    classNameList={[
                        "TropicaMenuButton__primaryIcon",
                        "TropicaMenuButton__icon"
                    ]} >
                    {PrimaryIcon}
                </GyampoComponent>}

            {hasText
                && <span
                    data-text={text}
                    className="TropicaMenuButton__text">
                    {text}
                </span>}

            {variant !== "TextButton" && SecondaryIcon
                && <GyampoComponent
                    as="span"
                    classNameList={[
                        "TropicaMenuButton__secondaryIcon",
                        "TropicaMenuButton__icon"
                    ]} >
                    {SecondaryIcon}
                </GyampoComponent>}
        </>}
    </GyampoComponent >
}