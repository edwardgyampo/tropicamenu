import { useContext, useRef } from "react";
import { navigationContext } from "../../lib/navigation/Provider";
import { GyampoComponent } from "../Component";
import { Screen, ScreenAnimations } from "../Screen";
import { Stack } from "../Stack";
import { FutureJourney } from "./FutureJourney";
import "./index.css";
import { PastJourney } from "./PastJourney";


export type MenuProps = {
    debug?: boolean
};

export const Menu = (props: MenuProps) => {
    const { debug = false } = props;
    const ref = useRef<HTMLDivElement>(null);
    const { navigation } = useContext(navigationContext);

    const classList = [
        "Menu",
        navigation.direction ? "Navigation--animated" : "",
        debug ? "Menu--debug" : "",
    ];

    return <GyampoComponent ref={ref} role="menu" classNameList={classList}>
        <div className="Menu__wrapper">
            <Stack direction="column" classNameList={["Menu__navigationPaths"]}>
                <PastJourney />

                <FutureJourney />
            </Stack>

            <div className="Menu__screens">

                {navigation.isForward && navigation.exitItem && <Screen
                    key={navigation.exitItem?.name}
                    id="BackScreen"
                    item={navigation.exitItem}
                    containerRef={ref}
                    animation={ScreenAnimations.SlideOutToLeft} />}

                {navigation.currentItem && <Screen
                    key={navigation.currentItem.name}
                    id="CurrentScreen"
                    item={navigation.currentItem}
                    containerRef={ref}
                    animation={
                        navigation.isForward
                            ? ScreenAnimations.SlideInFromRight
                            : ScreenAnimations.SlideInFromLeft
                    } />}

                {navigation.isBackward && navigation.exitItem && <Screen
                    key={navigation.exitItem?.name}
                    id="NextScreen"
                    item={navigation.exitItem}
                    containerRef={ref}
                    animation={ScreenAnimations.SlideOutToRight} />}

            </div>
        </div>
    </GyampoComponent>
}