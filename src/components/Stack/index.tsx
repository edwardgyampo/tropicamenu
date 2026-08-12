import { GyampoComponent, type GyampoComponentProps } from "../Component"
import "./index.css"

export const Stack = ({
    direction,
    classNameList = [],
    children,
    ...remainderProps
}: GyampoComponentProps<"div", ({
    direction: "row" | "row-reverse" | "column" | "column-reverse"
})>) => {

    return <GyampoComponent
        {...remainderProps}
        classNameList={[
            ...classNameList,
            "Stack",
            `Stack--${direction}`
        ]}>
        {children}
    </GyampoComponent>
}