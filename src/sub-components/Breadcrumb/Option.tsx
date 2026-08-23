import { useContext } from "react";
import type { ListItem } from "../../List"
import { TropicaMenuButton } from "../Button/Button"
import { TopicaMenuContext } from "../../Provider";

export const BreadcrumbOption = (props: { item: ListItem } ) => {
    const { navigation } = useContext(TopicaMenuContext);

    return <TropicaMenuButton
        text={props.item.name}
        onClick={_ => navigation.select(props.item)} />
}