// A wrapper component to serve as the base of all components.
import type React from "react"
import { compoundClassName } from "../../lib/compoundClassName";


export type GyampoBaseComponentProps<T = {}> = T & {
    classNameList?: Parameters<typeof compoundClassName>[0]
}

export type GyampoComponentProps<T extends React.ElementType = "div", U = {}> =
    GyampoBaseComponentProps<U>
    & { as?: T }
    & Omit<
        React.ComponentPropsWithRef<T>,
        keyof GyampoBaseComponentProps<U>
    >;

export const GyampoComponent = <T extends React.ElementType = "div">(props: GyampoComponentProps<T>) => {
    const ElementType = props.as || "div";

    const { classNameList, children, className, ...builtinProps } = props;

    return <ElementType
        ref={props.ref}
        {...builtinProps}
        className={compoundClassName([
            "Component",
            ...classNameList || [],
            className,
        ])}>

        {children}

    </ElementType>
}