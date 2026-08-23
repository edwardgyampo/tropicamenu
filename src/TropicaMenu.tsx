import { useContext, useRef } from "react";
import { GyampoComponent } from "./GyampoComponent/GyampoComponent";
import { ScreenIds } from "./Navigation";
import { TropicaMenuContext } from "./Provider";
import "./TropicaMenu.css";
import { TropicaMenuFutureJourney } from "./sub-components/FutureJourney";
import { TropicaMenuPastJourney } from "./sub-components/PastJourney/PastJourney";
import { TropicaMenuScreen, TropicaMenuScreenAnimations } from "./sub-components/Screen/Screen";
import { TropicaMenuStack } from "./sub-components/Stack";


type TropicaMenuProps = {
    debug?: boolean
};

export const TropicaMenu = (props: TropicaMenuProps) => {
    const { debug = false } = props;
    const ref = useRef<HTMLDivElement>(null);
    const { navigation } = useContext(TropicaMenuContext);

    const classList = [
        "TropicaMenu",
        navigation.direction ? "Navigation--animated" : "",
        debug ? "TropicaMenu--debug" : "",
    ];

    return <GyampoComponent ref={ref} role="menu" classNameList={classList}>
        <div className="TropicaMenu__wrapper">
            <TropicaMenuStack direction="column" classNameList={["TropicaMenu__navigationPaths"]}>
                <TropicaMenuPastJourney />

                <TropicaMenuFutureJourney />
            </TropicaMenuStack>

            <div className="TropicaMenu__screens">

                {navigation.isForward && navigation.exitItem && <TropicaMenuScreen
                    key={navigation.exitItem.name}
                    id={ScreenIds.BackScreen}
                    item={navigation.exitItem}
                    containerRef={ref}
                    animation={TropicaMenuScreenAnimations.TropicaMenuSlideOutToLeft} />}

                {navigation.currentItem && <TropicaMenuScreen
                    key={navigation.currentItem.name}
                    id={ScreenIds.CurrentScreen}
                    item={navigation.currentItem}
                    containerRef={ref}
                    animation={
                        navigation.isForward
                            ? TropicaMenuScreenAnimations.TropicaMenuSlideInFromRight
                            : TropicaMenuScreenAnimations.TropicaMenuSlideInFromLeft
                    } />}

                {navigation.isBackward && navigation.exitItem && <TropicaMenuScreen
                    key={navigation.exitItem.name}
                    id={ScreenIds.NextScreen}
                    item={navigation.exitItem}
                    containerRef={ref}
                    animation={TropicaMenuScreenAnimations.TropicaMenuSlideOutToRight} />}

            </div>
        </div>
    </GyampoComponent>
}