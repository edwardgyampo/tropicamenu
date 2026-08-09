import "./index.css";
import type { AnimationEventHandler } from "react";
import type { JSX } from "react/jsx-runtime";
import type { useNavigation } from "../../lib/navigation/useNavigation";
import { GyampoComponent, type GyampoComponentProps } from "../Component";

export type ScreenProps = {
    title: string,
    content: JSX.Element,
    nav: ReturnType<typeof useNavigation>,
    container: React.RefObject<HTMLDivElement | null>
}

export const Screen = (props: GyampoComponentProps<ScreenProps>) => {
    const { classNameList = [], container, content, nav } = props;

    const onAnimationEnd: AnimationEventHandler = _ => {
        const el = container.current;
        if (!el) return;
        el.classList.remove(nav.classNames.direction);
    };

    return <GyampoComponent
        classNameList={[...classNameList, "Screen"]}
        onAnimationEnd={onAnimationEnd}>
        {content}
    </GyampoComponent>

}