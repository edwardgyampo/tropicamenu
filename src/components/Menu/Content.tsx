import type { MouseEventHandler } from "react";
import type { ListItem } from "../../lib/list";
import type { useNavigation } from "../../lib/navigation/useNavigation";
import { Button } from "../Button";
import { MenuHead } from "./Head";

export type MenuContentProps = {
    nav: ReturnType<typeof useNavigation>;
    item: ListItem
};

export const MenuContent = ({ item, nav }: MenuContentProps) => {

    const onClickItem: MouseEventHandler = e => {
        const el = e.currentTarget;
        const s = ".Button__text";
        const span: HTMLElement = el.querySelector(s)!;
        const itemName = span?.dataset.text?.trim();
        if (!itemName) return;
        nav.select(itemName);
    };


    return <div className="MenuContent">

        <MenuHead text={item.name} />

        <div className="MenuBody">
            <ul className={"Menu__builtinList"}>
                {item.list?.map(item => {
                    return <li
                        key={item.name}
                        className="Menu__item">
                        <Button
                            onClick={onClickItem}
                            text={item.name}
                            classNameList={[
                                "Menu__itemButton"
                            ]} />
                    </li>
                })}
            </ul>
        </div>
    </div>;
}