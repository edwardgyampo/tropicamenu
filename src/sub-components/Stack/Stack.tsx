import { GyampoComponent, type GyampoComponentProps } from "../../GyampoComponent/GyampoComponent"
import "./Stack.css"

export const TropicaMenuStack = ({
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
            "TropicaMenuStack",
            `TropicaMenuStack--${direction}`
        ]}>
        {children}
    </GyampoComponent>
}