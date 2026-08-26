import { useContext, useLayoutEffect, useRef, type RefObject } from "react";
import type { NavigationItem } from "../../Navigation";
import { TropicaMenuContext } from "../../Provider";
import { GyampoComponent, type GyampoComponentProps } from "../../GyampoComponent/GyampoComponent";
import { TropicaMenuBackButton } from "../BackButton";
import { TropicaMenuHomeButton } from "../HomeButton";
import { TropicaMenuNextButton } from "../NextButton";
import { TropicaMenuOptions } from "../Options";
import { TropicaMenuStack } from "../Stack";
import "./Screen.css";

export const TropicaMenuScreenAnimations = {
    SlideInFromRight: "TropicaMenuSlideInFromRight",
    SlideInFromLeft: "TropicaMenuSlideInFromLeft",
    SlideOutToLeft: "TropicaMenuSlideOutToLeft",
    SlideOutToRight: "TropicaMenuSlideOutToRight"
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
    const { navigation } = useContext(TropicaMenuContext);

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

        <GyampoComponent classNameList={["TropicaMenuScreen__quickActions"]}>

            <TropicaMenuHomeButton item={props.item} />

        </GyampoComponent>

        <TropicaMenuStack direction="row" classNameList={["TropicaMenuScreen__navigation"]}>

            <TropicaMenuBackButton item={item.backItem} />

            <TropicaMenuNextButton item={item.nextItem} />

        </TropicaMenuStack>

        <p className="TropicaMenu__title">
            {item.name}
        </p>

        <TropicaMenuOptions items={props.item.list} />

    </GyampoComponent>
}