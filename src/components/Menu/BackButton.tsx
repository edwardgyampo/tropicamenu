import { useContext } from "react";
import { Button, ButtonVariants } from "../Button"
import { navigationContext } from "../../lib/navigation/Provider";
import type { NavigationItem } from "../../lib/navigation";
import { GyampoIcon } from "../Icon";
import BackIcon from "@iconify-react/material-symbols/navigate-before";


export const BackButton = ({ item }: { item?: NavigationItem }) => {
    const { navigation } = useContext(navigationContext);

    return <Button
        {...item?.name
            ? { text: item?.name, variant: ButtonVariants.StandardButton }
            : { variant: ButtonVariants.IconButton }
        }
        classNameList={["Menu__BackButton"]}
        Icon={<GyampoIcon IconType={BackIcon}/>}
        onClick={() => navigation.goBack()}
        disabled={!navigation.hasPastItems} />
}