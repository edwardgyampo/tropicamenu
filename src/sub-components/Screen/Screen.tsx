import { useContext, useLayoutEffect, useRef, type RefObject } from "react";
import type { NavigationItem } from "../../Navigation";
import { TopicaMenuContext } from "../../Provider";
import { GyampoComponent, type GyampoComponentProps } from "../../GyampoComponent/GyampoComponent";
import { BackButton } from "../BackButton";
import { HomeButton } from "../HomeButton";
import { NextButton } from "../NextButton";
import { TopicaMenuOptions } from "../Options/Options";
import { Stack } from "../Stack/Stack";
import "./Screen.css";

export const TropicaMenuScreenAnimations = {
    SlideInFromRight: "SlideInFromRight",
    SlideInFromLeft: "SlideInFromLeft",
    SlideOutToLeft: "SlideOutToLeft",
    SlideOutToRight: "SlideOutToRight"
} as const;

export type TropicaMenuScreenAnimation = typeof TropicaMenuScreenAnimations[keyof typeof TropicaMenuScreenAnimations];

export type TropicaMenuScreenComponentProps = GyampoComponentProps<"div", {
    item: NavigationItem,
    containerRef: RefObject<HTMLDivElement | null>,
    animation: TropicaMenuScreenAnimation
}>;

export const TropicaMenuScreen = (props: TropicaMenuScreenComponentProps) => {
    const {
        animation,
        item,
        containerRef,
        classNameList = [],
        ...remainderProps
    } = props;

    const ref = useRef<HTMLDivElement>(null);
    const { navigation } = useContext(TopicaMenuContext);

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
        "TropicaMenuScreen",
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

        <p className="TropicaMenu__title">
            {item.name}
        </p>

        <TopicaMenuOptions items={props.item.list} />

    </GyampoComponent>
}