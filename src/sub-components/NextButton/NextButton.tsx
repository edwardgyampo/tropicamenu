import { useContext } from "react";
import type { NavigationItem } from "../../Navigation";
import { TopicaMenuContext } from "../../Provider";
import { Button, ButtonVariants } from "../Button";
import { GyampoIcon } from "../../GyampoIcon";

export const NextButton = ({ item }: { item?: NavigationItem }) => {
    const { navigation } = useContext(TopicaMenuContext);

    return <Button
        {...item?.name
            ? {
                text: item?.name,
                variant: ButtonVariants.StandardButtonReversed
            }
            : { variant: ButtonVariants.IconButton }
        }
        classNameList={["TropicaMenu__NextButton"]}
        PrimaryIcon={<GyampoIcon icon={"mdi:navigate-next"}/>}
        onClick={() => navigation.goForward()}
        disabled={!navigation.hasFutureItems} />
}