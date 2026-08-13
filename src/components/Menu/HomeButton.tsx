import { useContext } from "react";
import { navigationContext } from "../../lib/navigation/Provider";
import { Button, ButtonVariants } from "../Button";
import HomeIcon from "@iconify-react/material-symbols/home";
import { GyampoIcon } from "../Icon";

export const HomeButton = () => {
    const { navigation } = useContext(navigationContext);

    return <Button
        disabled={navigation.currentItem?.name === navigation.root.name}
        onClick={_ => navigation.select(navigation.root)}
        Icon={<GyampoIcon IconType={HomeIcon} />}
        text="BACK TO START"
        variant={ButtonVariants.StandardButton}
        classNameList={['Menu__HomeButton']} />
}