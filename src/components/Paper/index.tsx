import type { PropsWithChildren } from "react"
import { GyampoComponent, type GyampoComponentProps } from "../Component"

export const Paper = (props: GyampoComponentProps<PropsWithChildren>) => {
    const { classNameList = [], children } = props;

    return <GyampoComponent
        classNameList={[
            ...classNameList,
            "Paper"
        ]}>
        {children}
    </GyampoComponent>
}