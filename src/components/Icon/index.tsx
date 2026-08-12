import "./index.css";
import { useEffect, useRef } from "react";
import { GyampoComponent, type GyampoBaseComponentProps } from "../Component";

const SVG_DIR = './svg';

export type IconName =
    'Poolinpit'
    | 'Send'
    | 'Home'
    | 'NavigateBefore'
    | 'NavigateNext';

const icons = import.meta.glob("./svg/*.svg", {
    query: "?raw",
    import: "default"
});

export const Icon = (props: GyampoBaseComponentProps<{ name: IconName }>) => {
    const { name, ...remainderProps } = props;
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        (async () => {
            if (!ref.current) return;
            const loader = icons[`${SVG_DIR}/${name}.svg`];
            try {
                if (!loader) throw Error();
                const svg = await loader() as string;
                ref.current.innerHTML = svg;
            }
            catch (e) {
                console.error(`Icon "${name}" not found.`);
            }
        })();
    }, [name]);

    return <GyampoComponent
        {...remainderProps}
        as="span"
        className="Icon"
        ref={ref} />;
} 