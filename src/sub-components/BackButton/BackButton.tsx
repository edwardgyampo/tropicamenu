import { useContext } from "react";
import type { NavigationItem } from "../../Navigation";
import { TopicaMenuContext } from "../../Provider";
import { Button, ButtonVariants } from "../Button/Button";
import { GyampoIcon } from "../../GyampoIcon/GyampoIcon";


export const BackButton = ({ item }: { item?: NavigationItem }) => {
    const { navigation } = useContext(TopicaMenuContext);

    return <Button
        {...item?.name
            ? { text: item?.name, variant: ButtonVariants.StandardButton }
            : { variant: ButtonVariants.IconButton }
        }
        classNameList={["Menu__BackButton"]}
        PrimaryIcon={<GyampoIcon icon={"mdi:navigate-before"}/>}
        onClick={() => navigation.goBack()}
        disabled={!navigation.hasPastItems} />
}