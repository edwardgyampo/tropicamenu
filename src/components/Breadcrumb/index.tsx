import { Button } from "../Button";
import "./index.css";

export type BreadcrumbItem = string;

export interface BreadcrumbProps {
    name?: string,
    items: BreadcrumbItem[],
    renderItem: (item: BreadcrumbItem) => React.JSX.Element
};

const parser = new DOMParser();

export const Breadcrumb = ({ name, items, renderItem }: BreadcrumbProps) => {

    return <div className="Breadcrumb">
        <span className="Breadcrumb__name">{name}</span>

        <ul className="Breadcrumb__list">
            {(() => {
                const separatorDoc =
                    parser.parseFromString("&rsaquo;", "text/html");
                const separator = separatorDoc.body.textContent;
                const itemsSeparated = items?.map((item, i) =>
                    i > 0 ? [separator, item] : [item]);

                const seperatorElement =
                    (item: BreadcrumbItem, index: number) =>
                        <li
                            key={`Breadcrumb_${item}_${index}`}
                            className="Breadcrumb__item Breadcrumb__separator">
                            <Button text={separator} />
                        </li>;

                const button =
                    (item: BreadcrumbItem, index: number) =>
                        <li
                            key={`Breadcrumb_${item}_${index}`}
                            className="Breadcrumb__item Breadcrumb__button">
                            {renderItem ? renderItem(item) : <Button text={item} />}
                        </li>;

                return itemsSeparated?.flat()?.reverse().map((item, index) =>
                    item === separator
                        ? seperatorElement(item, index)
                        : button(item, index))
            })()}
        </ul>
    </div >
}