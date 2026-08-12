import { useContext, type MouseEventHandler } from "react";
import type { ListItem } from "../../lib/list";
import { Button, ButtonVariants, type ButtonProps } from "../Button";
import { navigationContext } from "../../lib/navigation/Provider";

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
                variant: ButtonVariants.StandardButtonReversed,
                icon: "NavigateNext",
                onClick: onClickItem
            }
            : { variant: ButtonVariants.TextButton };


    return <ul className={"Menu__builtinList"}>
        {items?.map(item => {
            return <li
                key={item.name}
                className="Menu__item">
                <Button
                    {...extraButtonProps(item)}
                    text={item.name}
                    classNameList={[
                        "Menu__itemButton"
                    ]} />
            </li>
        })}
    </ul>;
}