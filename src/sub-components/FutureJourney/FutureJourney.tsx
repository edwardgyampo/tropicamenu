import { useContext } from "react";
import { TropicaMenuContext } from "../../Provider";
import { TropicaMenuBreadcrumb, TropicaMenuBreadcrumbOption } from "../Breadcrumb";

export const TropicaMenuFutureJourney = () => {
    const { navigation } = useContext(TropicaMenuContext);

    return <TropicaMenuBreadcrumb
        classNameList={["TropicaMenuFutureJourney"]}
        name={"future"}
        items={navigation.future.toReversed().map(item => item)}
        renderItem={item => <TropicaMenuBreadcrumbOption item={item}/>} />
}