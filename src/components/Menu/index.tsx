import { useContext, useRef } from "react";
import { navigationContext } from "../../lib/navigation/Provider";
import { GyampoComponent } from "../Component";
import { Screen } from "../Screen";
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

                {navigation.isForward && navigation.backItem && <Screen
                    key={navigation.backItem?.name}
                    id="BackScreen"
                    item={navigation.backItem}
                    containerRef={ref}
                    animation={"SlideOutToLeft"} />}

                {navigation.currentItem && <Screen
                    key={navigation.currentItem.name}
                    id="CurrentScreen"
                    item={navigation.currentItem}
                    containerRef={ref}
                    animation={navigation.isForward
                        ? "SlideInFromRight"
                        : "SlideInFromLeft"} />}

                {navigation.isBackward && navigation.nextItem && <Screen
                    key={navigation.nextItem?.name}
                    id="NextScreen"
                    item={navigation.nextItem}
                    containerRef={ref}
                    animation={"SlideOutToRight"} />}

            </div>
        </div>
    </GyampoComponent>
}