// A wrapper component to serve as the base of all components.
import type React from "react"
import { compoundClassName } from "../../lib/compoundClassName";


export type GyampoComponentProps<T = {}> = T & {
    classNameList?: string[]
}

export type GenericComponentProps<T extends React.ElementType> =
    GyampoComponentProps
    & { as?: T }
    & Omit<
        React.ComponentPropsWithRef<T>,
        keyof GyampoComponentProps
    >;

export const GyampoComponent = <T extends React.ElementType = "div">(props: GenericComponentProps<T>) => {
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