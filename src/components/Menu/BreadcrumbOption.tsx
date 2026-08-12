import { useContext } from "react";
import type { ListItem } from "../../lib/list"
import { Button } from "../Button"
import { navigationContext } from "../../lib/navigation/Provider";

export const BreadcrumbOption = (props: { item: ListItem } ) => {
    const { navigation } = useContext(navigationContext);

    return <Button
        text={props.item.name}
        onClick={_ => navigation.select(props.item)} />
}