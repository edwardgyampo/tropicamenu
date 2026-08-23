import { useContext } from "react";
import type { NavigationItem } from "../../Navigation";
import { TropicaMenuContext } from "../../Provider";
import { TropicaMenuButton, TropicaMenuButtonVariants } from "../Button";
import { GyampoIcon } from "../../GyampoIcon";

export const TropicaMenuNextButton = ({ item }: { item?: NavigationItem }) => {
    const { navigation } = useContext(TropicaMenuContext);

    return <TropicaMenuButton
        {...item?.name
            ? {
                text: item?.name,
                variant: TropicaMenuButtonVariants.StandardButtonReversed
            }
            : { variant: TropicaMenuButtonVariants.IconButton }
        }
        classNameList={["TropicaMenuNextButton"]}
        PrimaryIcon={<GyampoIcon icon={"mdi:navigate-next"}/>}
        onClick={() => navigation.goForward()}
        disabled={!navigation.hasFutureItems} />
}