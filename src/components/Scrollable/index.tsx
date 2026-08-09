import type { PropsWithChildren } from "react"
import { GyampoComponent, type GyampoComponentProps } from "../Component"

type ScrollableProps = PropsWithChildren<{
    direction: "rtl" | "ltr" | "ttb" | "btt"
}>;

export const Scrollable = ({
    children,
    direction,
    ...remainderProps
}: GyampoComponentProps<ScrollableProps>) => {

    return <GyampoComponent
        {...remainderProps}
        classNameList={["Scrollable"]}>
        {children}
    </GyampoComponent>
}