import type { AnimationEventHandler } from "react";
import type { JSX } from "react/jsx-runtime";
import type { useNavigation } from "../../lib/navigation/useNavigation";
import { GyampoComponent, type GenericComponentProps } from "../Component";
import "./index.css";

export type ScreenProps = {
    title: string,
    content: JSX.Element,
    nav: ReturnType<typeof useNavigation>,
    container: React.RefObject<HTMLDivElement | null>
}

export type ScreenComponentProps =
    Omit<
        GenericComponentProps<"div">,
        keyof ScreenProps
    > & ScreenProps;


export const Screen = (props: ScreenComponentProps) => {
    const { classNameList = [], container, content, nav } = props;

    const onAnimationEnd: AnimationEventHandler = _ => {
        const el = container.current;
        if (!el) return;
        el.classList.remove(nav.classNames.direction);
    };

    return <GyampoComponent
        ref={props.ref}
        classNameList={[...classNameList, "Screen"]}
        onAnimationEnd={onAnimationEnd}>
        {content}
    </GyampoComponent>

}