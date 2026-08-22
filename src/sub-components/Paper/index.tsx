import type { PropsWithChildren } from "react"
import { GyampoComponent, type GyampoBaseComponentProps } from "../../GyampoComponent/GyampoComponent"

export const Paper = (props: GyampoBaseComponentProps<PropsWithChildren>) => {
    const { classNameList = [], children } = props;

    return <GyampoComponent
        classNameList={[
            ...classNameList,
            "Paper"
        ]}>
        {children}
    </GyampoComponent>
}