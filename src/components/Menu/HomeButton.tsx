import { useContext } from "react";
import { navigationContext } from "../../lib/navigation/Provider";
import { Button, ButtonVariants } from "../Button";
import { GyampoIcon } from "../Icon";
import type { NavigationItem } from "../../lib/navigation";

export const HomeButton = (props: { item: NavigationItem }) => {
    const { item } = props;
    const { navigation } = useContext(navigationContext);

    return <Button
        disabled={item.name === navigation.root.name}
        onClick={_ => navigation.goToStart()}
        PrimaryIcon={<GyampoIcon icon={"mdi:restart"} />}
        text="BACK TO START"
        variant={ButtonVariants.StandardButton}
        classNameList={['Screen__HomeButton']} />
}