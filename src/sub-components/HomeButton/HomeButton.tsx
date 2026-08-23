import { useContext } from "react";
import { TropicaMenuContext } from "../../Provider";
import { TropicaMenuButton, TropicaMenuButtonVariants } from "../Button";
import { GyampoIcon } from "../../GyampoIcon/GyampoIcon";
import type { NavigationItem } from "../../Navigation";

export const TropicaMenuHomeButton = (props: { item: NavigationItem }) => {
    const { item } = props;
    const { navigation } = useContext(TropicaMenuContext);

    return <TropicaMenuButton
        disabled={item.name === navigation.root.name}
        onClick={_ => navigation.goToStart()}
        PrimaryIcon={<GyampoIcon icon={"mdi:restart"} />}
        text="BACK TO START"
        variant={TropicaMenuButtonVariants.StandardButton}
        classNameList={['Screen__HomeButton']} />
}