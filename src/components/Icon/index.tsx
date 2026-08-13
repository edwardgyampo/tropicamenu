import { type JSX } from "react";
import { GyampoComponent, type GyampoBaseComponentProps } from "../Component";
import "./index.css";

type IconElementType = JSX.ElementType;

export type GyampoIconComponentProps = GyampoBaseComponentProps<{
    IconType: IconElementType
}>;

export type GyampoIconComponent = typeof GyampoIcon;

export const GyampoIcon = (props: GyampoIconComponentProps) => {
    const { IconType, ...remainderProps } = props;

    return <GyampoComponent
        {...remainderProps}
        as="span"
        className="Icon">

        <IconType />

    </GyampoComponent>;
}