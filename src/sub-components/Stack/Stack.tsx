import { GyampoComponent, type GyampoComponentProps } from "../../GyampoComponent/GyampoComponent"
import "./Stack.css"

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