import type { PropsWithChildren } from "react"
import { GyampoComponent, type GyampoBaseComponentProps } from "../../GyampoComponent/GyampoComponent"

type ScrollableProps = PropsWithChildren<{
    direction: "rtl" | "ltr" | "ttb" | "btt"
}>;

export const Scrollable = ({
    children,
    direction,
    ...remainderProps
}: GyampoBaseComponentProps<ScrollableProps>) => {

    return <GyampoComponent
        {...remainderProps}
        classNameList={["Scrollable"]}>
        {children}
    </GyampoComponent>
}