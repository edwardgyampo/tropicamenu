import { useContext } from "react";
import { TropicaMenuContext } from "../../Provider";
import { TropicaMenuBreadcrumb } from "../Breadcrumb/Breadcrumb";
import { TropicaMenuButton } from "../Button/Button";

export const TropicaMenuPastJourney = () => {
    const { navigation } = useContext(TropicaMenuContext);

    return <TropicaMenuBreadcrumb
        name={"past"}
        classNameList={["TropicaMenuPastJourney"]}
        items={navigation.past.toReversed().map(item => item)}
        renderItem={item =>
            <TropicaMenuButton
                onClick={() => navigation.select(item)}
                text={item.name} />} />
}