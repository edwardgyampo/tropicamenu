import { useContext } from "react";
import type { ListItem } from "../../List"
import { TropicaMenuButton } from "../Button/Button"
import { TropicaMenuContext } from "../../Provider";

export const TropicaMenuBreadcrumbOption = (props: { item: ListItem } ) => {
    const { navigation } = useContext(TropicaMenuContext);

    return <TropicaMenuButton
        text={props.item.name}
        onClick={_ => navigation.select(props.item)} />
}