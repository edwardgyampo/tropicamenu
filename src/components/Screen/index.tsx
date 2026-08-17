import { useContext, useLayoutEffect, useRef, type RefObject } from "react";
import type { NavigationItem } from "../../lib/navigation";
import { navigationContext } from "../../lib/navigation/Provider";
import { GyampoComponent, type GyampoComponentProps } from "../Component";
import { BackButton } from "../Menu/BackButton";
import { HomeButton } from "../Menu/HomeButton";
import { NextButton } from "../Menu/NextButton";
import { MenuOptions } from "../Menu/Options";
import { Stack } from "../Stack";
import "./index.css";

export const ScreenAnimations = {
    SlideInFromRight: "SlideInFromRight",
    SlideInFromLeft: "SlideInFromLeft",
    SlideOutToLeft: "SlideOutToLeft",
    SlideOutToRight: "SlideOutToRight"
} as const;

export type ScreenAnimation = typeof ScreenAnimations[keyof typeof ScreenAnimations];

export type ScreenComponentProps = GyampoComponentProps<"div", {
    item: NavigationItem,
    containerRef: RefObject<HTMLDivElement | null>,
    animation: ScreenAnimation
}>;

export const Screen = (props: ScreenComponentProps) => {
    const {
        animation,
        item,
        containerRef,
        classNameList = [],
        ...remainderProps
    } = props;

    const ref = useRef<HTMLDivElement>(null);
    const { navigation } = useContext(navigationContext);

    useLayoutEffect(() => {
        const updateSize = () => {
            if (!ref.current || !props.containerRef.current) return;

            ref.current.inert = ref.current.id !== "CurrentScreen";

            const rect = ref.current!.getBoundingClientRect();
            const w = `${Math.ceil(rect.width)}px`;
            const h = `${Math.ceil(rect.height)}px`;
            props.containerRef.current.style?.setProperty(`--${ref.current.id}-width`, w);
            props.containerRef.current.style?.setProperty(`--${ref.current.id}-height`, h);
        };

        updateSize();
        const observer = new ResizeObserver(updateSize);
        ref.current && observer.observe(ref.current);

        return () => {
            observer.disconnect();
        }
    }, [
        navigation.currentItem,
        ref.current,
        props.containerRef.current,
    ]);

    const classNames = [
        ...classNameList,
        "Screen",
        animation
    ];

    return <GyampoComponent
        {...remainderProps}
        ref={ref}
        classNameList={classNames}>

        <GyampoComponent classNameList={["Screen__quickActions"]}>

            <HomeButton item={props.item} />

        </GyampoComponent>

        <Stack direction="row" classNameList={["Screen__navigation"]}>

            <BackButton item={item.backItem} />

            <NextButton item={item.nextItem} />

        </Stack>

        <p className="Menu__title">
            {item.name}
        </p>

        <MenuOptions items={props.item.list} />

    </GyampoComponent>
}