import { useEffect, useRef } from "react";
import type { ListItem } from "../../lib/list";
import { useNavigation } from "../../lib/navigation/useNavigation";
import { Breadcrumb, type BreadcrumbItem } from "../Breadcrumb";
import { Button, ButtonVariants } from "../Button";
import { GyampoComponent } from "../Component";
import { Screen } from "../Screen/Screen";
import { MenuContent } from "./Content";
import "./index.css";
import { Icon } from "../Icon";

const renderBreadcrumbItem =
    (nav: ReturnType<typeof useNavigation>) =>
        (item: BreadcrumbItem) =>
            <Button
                text={item}
                onClick={_ => nav.select(item)} />;


export type MenuProps = {
    root: ListItem,
    debug?: boolean,
    nerd?: boolean
};

export const Menu = (props: MenuProps) => {
    const { root, debug = false, nerd = false } = props;
    const ref = useRef<HTMLDivElement>(null);
    const nav = useNavigation({ root });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const str = nav.classNames.direction;
        if (el.classList.contains(str)) return;
        el.classList.add(str);
    }, [
        ref.current,
        nav.classNames.direction,
        nav.state.present
    ]);

    useEffect(() => {
        if (!ref.current) return;
        const current = ref.current.querySelector(".Menu__screens .Screen--current");
        const rect = current!.getBoundingClientRect();
        const width = `${Math.ceil(rect.width)}px`;
        const height = `${Math.ceil(rect.height)}px`;
        ref.current.style?.setProperty("--width", width);
        ref.current.style?.setProperty("--height", height);
    }, [
        ref.current,
        nav.state.present
    ]);

    return <GyampoComponent ref={ref} role="menu"
        classNameList={[
            debug ? "Menu--debug" : "",
            nerd ? "Menu--nerd" : "",
            "Menu",
            nav.classNames.direction
        ]}>

        <div className="Menu__wrapper">
            <div className="Menu__actionArea">
                <Button
                    disabled={nav.state.present.name === root.name}
                    onClick={_ => nav.select(root.name)}
                    icon="Home"
                    text="Go to Start"
                    variant={ButtonVariants.TextButton}
                    classNameList={['Menu__homeButton']} />
            </div>


            <div className="Menu__sectionForNerds">
                <div className="Menu__breadcrumbs">
                    <Breadcrumb
                        name={"past"}
                        items={nav.state.past.map(x => x.name)}
                        renderItem={renderBreadcrumbItem(nav)} />

                    <Breadcrumb
                        name={"future"}
                        items={nav.state.future.map(x => x.name)}
                        renderItem={renderBreadcrumbItem(nav)} />
                </div>
            </div>

            <div className="Menu__navigation">
                <Button
                    variant={ButtonVariants.IconButton}
                    onClick={() => nav.goBack()}
                    disabled={!nav.hasPastItems()}>
                    <Icon name="NavigateBefore"/>
                </Button>

                <Button
                    variant={ButtonVariants.IconButton}
                    onClick={() => nav.goFoward()}
                    disabled={!nav.hasFutureItems()}>
                    <Icon name="NavigateNext"/>
                </Button>
            </div>


            <div className="Menu__screens">
                {nav.backItem && <Screen
                    classNameList={["Screen--back", "Menu__screen"]}
                    title={nav.backItem.name}
                    nav={nav}
                    container={ref}
                    content={<MenuContent nav={nav} item={nav.backItem} />} />}

                {nav.currentItem && <Screen
                    classNameList={["Screen--current", "Menu__screen"]}
                    title={nav.currentItem.name}
                    nav={nav}
                    container={ref}
                    content={<MenuContent nav={nav} item={nav.currentItem} />} />}

                {nav.nextItem && <Screen
                    classNameList={["Screen--next", "Menu__screen"]}
                    title={nav.nextItem.name}
                    nav={nav}
                    container={ref}
                    content={<MenuContent nav={nav} item={nav.nextItem} />} />}
            </div>
        </div>
    </GyampoComponent>
}