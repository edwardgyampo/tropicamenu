import type { PropsWithChildren } from "react";
import type { ListItem } from "../../List";
import { GyampoComponent, type GyampoBaseComponentProps } from "../../GyampoComponent/GyampoComponent";
import { GyampoIcon } from "../../GyampoIcon/GyampoIcon";
import "./Breadcrumb.css";

export interface TropicaMenuBreadcrumbProps extends GyampoBaseComponentProps {
    name?: string,
    items: ListItem[],
    renderItem: (item: ListItem) => React.JSX.Element
};

const TropicaMenuBreadcrumbItem = ({ children }: PropsWithChildren) => {
    return <GyampoComponent
        as="li"
        classNameList={[
            "TropicaMenuBreadcrumb__item",
            "TropicaMenuBreadcrumb__button"
        ]}>
        {children}
    </ GyampoComponent>;
};

export const TropicaMenuBreadcrumb = (props: TropicaMenuBreadcrumbProps) => {
    const {
        classNameList = [],
        name,
        items,
        renderItem
    } = props;


    const TropicaMenuBreadcrumbItems = () => items.map((item, index) => {
        return index > 0
            ? [
                <TropicaMenuBreadcrumbItem key={"s_" + index}>
                    <GyampoIcon icon={"mdi:navigate-next"} />
                </TropicaMenuBreadcrumbItem>,
                <TropicaMenuBreadcrumbItem key={"i_" + index}>
                    {renderItem(item)}
                </TropicaMenuBreadcrumbItem>
            ]
            : [<TropicaMenuBreadcrumbItem key={index}>
                {renderItem(item)}
            </TropicaMenuBreadcrumbItem>]
    });

    return <GyampoComponent
        classNameList={[
            ...classNameList,
            "TropicaMenuBreadcrumb"
        ]}>

        <span className="TropicaMenuBreadcrumb__name">
            {name}
        </span>

        <ul className="TropicaMenuBreadcrumb__list">

            <TropicaMenuBreadcrumbItems />

        </ul>
    </GyampoComponent >
}