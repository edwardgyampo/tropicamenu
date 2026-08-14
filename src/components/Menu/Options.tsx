import { useContext, type MouseEventHandler } from "react";
import type { ListItem } from "../../lib/list";
import { navigationContext } from "../../lib/navigation/Provider";
import { Button, ButtonVariants, type ButtonProps } from "../Button";
import { GyampoIcon } from "../Icon";

export type MenuOptionsProps = {
    items?: ListItem[]
};

export const MenuOptions = (props: MenuOptionsProps) => {
    const { items = [] } = props;
    const { navigation } = useContext(navigationContext);

    const onClickItem: MouseEventHandler = e => {
        const el = e.currentTarget;
        const s = ".Button__text";
        const span: HTMLElement = el.querySelector(s)!;
        const name = span?.dataset.text?.trim();
        if (!name) return;
        navigation.select({ name } as ListItem);
    };

    const extraButtonProps = (item: ListItem): ButtonProps =>
        item.list && item.list.length > 0
            ? {
                variant: ButtonVariants.StandardButton,
                SecondaryIcon: <GyampoIcon icon={"mdi:navigate-next"} />,
                onClick: onClickItem
            }
            : { variant: ButtonVariants.StandardButton };


    return <ul className={"Menu__builtinList"}>
        {items?.map(item => {
            return <li
                key={item.name}
                className="Menu__item">
                <Button
                    {...extraButtonProps(item)}
                    text={item.name}
                    {...item.icon ? { PrimaryIcon: <GyampoIcon icon={item.icon} /> } : {}}
                    classNameList={[
                        "Menu__itemButton"
                    ]} />
            </li>
        })}
    </ul>;
}