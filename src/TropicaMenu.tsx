import { useContext, useRef } from "react";
import { GyampoComponent } from "./GyampoComponent/GyampoComponent";
import "./index.css";
import { ScreenIds } from "./Navigation";
import { TopicaMenuContext } from "./Provider";
import { PastJourney } from "./sub-components/PastJourney/PastJourney";
import { FutureJourney } from "./sub-components/FutureJourney";
import { Screen, ScreenAnimations } from "./sub-components/Screen/Screen";
import { Stack } from "./sub-components/Stack";

export { TropicaMenuProvider } from "./Provider";

type TropicaMenuProps = {
    debug?: boolean
};

export const TropicaMenu = (props: TropicaMenuProps) => {
    const { debug = false } = props;
    const ref = useRef<HTMLDivElement>(null);
    const { navigation } = useContext(TopicaMenuContext);

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
                    key={navigation.exitItem.name}
                    id={ScreenIds.BackScreen}
                    item={navigation.exitItem}
                    containerRef={ref}
                    animation={ScreenAnimations.SlideOutToLeft} />}

                {navigation.currentItem && <Screen
                    key={navigation.currentItem.name}
                    id={ScreenIds.CurrentScreen}
                    item={navigation.currentItem}
                    containerRef={ref}
                    animation={
                        navigation.isForward
                            ? ScreenAnimations.SlideInFromRight
                            : ScreenAnimations.SlideInFromLeft
                    } />}

                {navigation.isBackward && navigation.exitItem && <Screen
                    key={navigation.exitItem.name}
                    id={ScreenIds.NextScreen}
                    item={navigation.exitItem}
                    containerRef={ref}
                    animation={ScreenAnimations.SlideOutToRight} />}

            </div>
        </div>
    </GyampoComponent>
}