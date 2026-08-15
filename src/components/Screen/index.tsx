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

export type ScreenComponentProps = GyampoComponentProps<"div", {
    item: NavigationItem,
    containerRef: RefObject<HTMLDivElement | null>,
    animation: "SlideInFromRight" | "SlideOutToLeft" | "SlideInFromLeft" | "SlideOutToRight"
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

        <Stack
            direction="column"
            classNameList={["Screen__navigation"]}>

            <Stack
                direction="row"
                style={{ justifyContent: "center" }}>
                <HomeButton />
            </Stack>


            <Stack
                direction="row"
                style={{
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>

                <BackButton item={item.backItem} />

                <NextButton item={item.nextItem} />
            </Stack>

        </Stack>

        <p className="Menu__title">
            {item.name}
        </p>

        <MenuOptions items={props.item.list} />

    </GyampoComponent>
}