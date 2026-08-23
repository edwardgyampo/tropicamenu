import { useContext } from "react";
import type { NavigationItem } from "../../Navigation";
import { TopicaMenuContext } from "../../Provider";
import { TropicaMenuButton, TropicaMenuButtonVariants } from "../Button/Button";
import { GyampoIcon } from "../../GyampoIcon/GyampoIcon";


export const BackButton = ({ item }: { item?: NavigationItem }) => {
    const { navigation } = useContext(TopicaMenuContext);

    return <TropicaMenuButton
        {...item?.name
            ? { text: item?.name, variant: TropicaMenuButtonVariants.StandardButton }
            : { variant: TropicaMenuButtonVariants.IconButton }
        }
        classNameList={["TropicaMenu__BackButton"]}
        PrimaryIcon={<GyampoIcon icon={"mdi:navigate-before"}/>}
        onClick={() => navigation.goBack()}
        disabled={!navigation.hasPastItems} />
}