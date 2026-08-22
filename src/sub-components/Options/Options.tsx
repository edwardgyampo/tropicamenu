import { useContext, useMemo, type MouseEventHandler } from "react";
import type { ListItem } from "../../List";
import { TopicaMenuContext } from "../../Provider";
import { Button, ButtonVariants, type ButtonProps } from "../Button/Button";
import { GyampoIcon } from "../../GyampoIcon/GyampoIcon";

export type TropicaMenuOptionsProps = {
    items?: ListItem[]
};

export const TopicaMenuOptions = (props: TropicaMenuOptionsProps) => {
    const { items = [] } = props;
    const { navigation } = useContext(TopicaMenuContext);

    const onClickItem: MouseEventHandler = e => {
        const el = e.currentTarget;
        const s = ".Button__text";
        const span: HTMLElement = el.querySelector(s)!;
        const name = span?.dataset.text?.trim();
        if (!name) return;
        navigation.select({ name } as ListItem);
    };

    const itemElements = useMemo(() => {
        return items?.map((item) => {
            const ariaExpanded = item.name === navigation.currentItem?.name;
            
            const extraButtonProps = (item: ListItem): ButtonProps =>
                item.list && item.list.length > 0
                    ? {
                        variant: ButtonVariants.StandardButton,
                        SecondaryIcon: <GyampoIcon icon={"mdi:navigate-next"} />,
                        onClick: onClickItem,
                        "aria-haspopup": "menu",
                        "aria-expanded": ariaExpanded
                    }
                    : {
                        variant: ButtonVariants.StandardButton
                    };

            return <li
                key={item.name}
                className="Menu__item">
                <Button
                    {...extraButtonProps(item)}
                    aria-controls={item.name}
                    role="menuitem"

                    text={item.name}
                    {...item.icon ? { PrimaryIcon: <GyampoIcon icon={item.icon} /> } : {}}
                    classNameList={[
                        "Menu__itemButton"
                    ]} />
            </li>
        })
    }, [
        navigation.currentItem?.name
    ]);

    return <ul
        className={"Menu__builtinList"}
        role="menu">

        {itemElements}

    </ul>;
}