import { useContext } from "react";
import type { NavigationItem } from "../../lib/navigation";
import { navigationContext } from "../../lib/navigation/Provider";
import { Button, ButtonVariants } from "../Button";
import { GyampoIcon } from "../Icon";


export const BackButton = ({ item }: { item?: NavigationItem }) => {
    const { navigation } = useContext(navigationContext);

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