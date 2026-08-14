import { useContext } from "react";
import type { NavigationItem } from "../../lib/navigation";
import { navigationContext } from "../../lib/navigation/Provider";
import { Button, ButtonVariants } from "../Button";
import { GyampoIcon } from "../Icon";

export const NextButton = ({ item }: { item?: NavigationItem }) => {
    const { navigation } = useContext(navigationContext);

    return <Button
        {...item?.name
            ? {
                text: item?.name,
                variant: ButtonVariants.StandardButtonReversed
            }
            : { variant: ButtonVariants.IconButton }
        }
        classNameList={["Menu__NextButton"]}
        PrimaryIcon={<GyampoIcon icon={"mdi:navigate-next"}/>}
        onClick={() => navigation.goForward()}
        disabled={!navigation.hasFutureItems} />
}