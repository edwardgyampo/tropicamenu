import { useContext } from "react";
import type { NavigationItem } from "../../Navigation";
import { TropicaMenuContext } from "../../Provider";
import { TropicaMenuButton, TropicaMenuButtonVariants } from "../Button/Button";
import { GyampoIcon } from "../../GyampoIcon/GyampoIcon";


export const TropicaMenuBackButton = ({ item }: { item?: NavigationItem }) => {
    const { navigation } = useContext(TropicaMenuContext);

    return <TropicaMenuButton
        {...item?.name
            ? { text: item?.name, variant: TropicaMenuButtonVariants.StandardButton }
            : { variant: TropicaMenuButtonVariants.IconButton }
        }
        classNameList={["TropicaMenuBackButton"]}
        PrimaryIcon={<GyampoIcon icon={"mdi:navigate-before"}/>}
        onClick={() => navigation.goBack()}
        disabled={!navigation.hasPastItems} />
}