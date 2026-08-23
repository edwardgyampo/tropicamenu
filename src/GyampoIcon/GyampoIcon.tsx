import { Icon } from "@iconify/react";
import { GyampoComponent, type GyampoBaseComponentProps } from "../GyampoComponent/GyampoComponent";
import "./GyampoIcon.css";

export type GyampoIconComponentProps = GyampoBaseComponentProps<{
    icon: string
}>;

export type GyampoIconComponent = typeof GyampoIcon;

export const GyampoIcon = (props: GyampoIconComponentProps) => {
    const { icon, ...remainderProps } = props;

    return <GyampoComponent
        {...remainderProps}
        as="span"
        className="Icon">

        <Icon icon={icon} />

    </GyampoComponent>;
}