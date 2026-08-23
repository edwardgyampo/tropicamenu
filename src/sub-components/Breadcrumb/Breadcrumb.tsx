import type { PropsWithChildren } from "react";
import type { ListItem } from "../../List";
import { GyampoComponent, type GyampoBaseComponentProps } from "../../GyampoComponent/GyampoComponent";
import { GyampoIcon } from "../../GyampoIcon/GyampoIcon";
import "./Breadcrumb.css";

export interface BreadcrumbProps extends GyampoBaseComponentProps {
    name?: string,
    items: ListItem[],
    renderItem: (item: ListItem) => React.JSX.Element
};

export const Breadcrumb = (props: BreadcrumbProps) => {
    const {
        classNameList = [],
        name,
        items,
        renderItem
    } = props;

    const Item = ({ children }: PropsWithChildren) =>
        <GyampoComponent
            as="li"
            classNameList={[
                "Breadcrumb__item",
                "Breadcrumb__button"
            ]}>
            {children}
        </ GyampoComponent>

    const BreadcrumbItems = () => items.map((item, index) => {
        return index > 0
            ? [
                <Item key={"s_" + index}>
                    <GyampoIcon icon={"mdi:navigate-next"}/>
                </Item>,
                <Item key={"i_" + index}>
                    {renderItem(item)}
                </Item>
            ]
            : [<Item key={index}>
                {renderItem(item)}
            </Item>]
    });

    return <GyampoComponent
        classNameList={[
            ...classNameList,
            "Breadcrumb"
        ]}>

        <span className="Breadcrumb__name">
            {name}
        </span>

        <ul className="Breadcrumb__list">
            
            <BreadcrumbItems />

        </ul>
    </GyampoComponent >
}