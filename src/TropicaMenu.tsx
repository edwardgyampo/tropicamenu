import { useContext, useRef } from "react";
import { GyampoComponent } from "./GyampoComponent/GyampoComponent";
import "./index.css";
import { ScreenIds } from "./Navigation";
import { TopicaMenuContext } from "./Provider";
import { PastJourney } from "./sub-components/PastJourney/PastJourney";
import { FutureJourney } from "./sub-components/FutureJourney";
import { TropicaMenuScreen, TropicaMenuScreenAnimations } from "./sub-components/Screen/Screen";
import { Stack } from "./sub-components/Stack";


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

                {navigation.isForward && navigation.exitItem && <TropicaMenuScreen
                    key={navigation.exitItem.name}
                    id={ScreenIds.BackScreen}
                    item={navigation.exitItem}
                    containerRef={ref}
                    animation={TropicaMenuScreenAnimations.SlideOutToLeft} />}

                {navigation.currentItem && <TropicaMenuScreen
                    key={navigation.currentItem.name}
                    id={ScreenIds.CurrentScreen}
                    item={navigation.currentItem}
                    containerRef={ref}
                    animation={
                        navigation.isForward
                            ? TropicaMenuScreenAnimations.SlideInFromRight
                            : TropicaMenuScreenAnimations.SlideInFromLeft
                    } />}

                {navigation.isBackward && navigation.exitItem && <TropicaMenuScreen
                    key={navigation.exitItem.name}
                    id={ScreenIds.NextScreen}
                    item={navigation.exitItem}
                    containerRef={ref}
                    animation={TropicaMenuScreenAnimations.SlideOutToRight} />}

            </div>
        </div>
    </GyampoComponent>
}