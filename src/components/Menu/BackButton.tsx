import { useContext } from "react";
import { Button, ButtonVariants } from "../Button"
import { navigationContext } from "../../lib/navigation/Provider";
import type { NavigationItem } from "../../lib/navigation";

export const BackButton = ({ item }: { item?: NavigationItem }) => {
    const { navigation } = useContext(navigationContext);

    return <Button
        {...item?.name
            ? { text: item?.name, variant: ButtonVariants.StandardButton }
            : { variant: ButtonVariants.IconButton }
        }
        classNameList={["BackButton"]}
        icon="NavigateBefore"
        onClick={() => navigation.goBack()}
        disabled={!navigation.hasPastItems} />
}