import { useContext, useMemo, type MouseEventHandler } from "react";
import type { ListItem } from "../../List";
import { TropicaMenuContext } from "../../Provider";
import { TropicaMenuButton, TropicaMenuButtonVariants, type TropicaMenuButtonProps } from "../Button/Button";
import { GyampoIcon } from "../../GyampoIcon/GyampoIcon";

export type TropicaMenuOptionsProps = {
    items?: ListItem[]
};

export const TropicaMenuOptions = (props: TropicaMenuOptionsProps) => {
    const { items = [] } = props;
    const { navigation } = useContext(TropicaMenuContext);

    const onClickItem: MouseEventHandler = e => {
        navigation.select({
            name: e.currentTarget.getAttribute("aria-controls")?.trim()
        } as ListItem);
    };

    const itemElements = useMemo(() => {
        return items?.map((item) => {
            const ariaExpanded = item.name === navigation.currentItem?.name;

            const extraButtonProps = (item: ListItem): TropicaMenuButtonProps =>
                item.list && item.list.length > 0
                    ? {
                        variant: TropicaMenuButtonVariants.StandardButton,
                        SecondaryIcon: <GyampoIcon icon={"mdi:navigate-next"} />,
                        onClick: onClickItem,
                        "aria-haspopup": "menu",
                        "aria-expanded": ariaExpanded
                    }
                    : {
                        variant: TropicaMenuButtonVariants.StandardButton
                    };

            return <li
                key={item.name}
                className="TropicaMenu__item">
                <TropicaMenuButton
                    {...extraButtonProps(item)}
                    aria-controls={item.name}
                    role="menuitem"

                    text={item.name}
                    {...item.icon ? { PrimaryIcon: <GyampoIcon icon={item.icon} /> } : {}}
                    classNameList={[
                        "TropicaMenu__itemButton"
                    ]} />
            </li>
        })
    }, [
        navigation.currentItem?.name
    ]);

    return <ul
        className={"TropicaMenu__builtinList"}
        role="menu">

        {itemElements}

    </ul>;
}