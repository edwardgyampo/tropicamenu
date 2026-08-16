import { useContext } from "react";
import { navigationContext } from "../../lib/navigation/Provider";
import { Button, ButtonVariants } from "../Button";
import { GyampoIcon } from "../Icon";

export const HomeButton = () => {
    const { navigation } = useContext(navigationContext);

    return <Button
        disabled={navigation.currentItem?.name === navigation.root.name}
        onClick={_ => navigation.goToStart()}
        PrimaryIcon={<GyampoIcon icon={"mdi:restart"} />}
        text="BACK TO START"
        variant={ButtonVariants.StandardButton}
        classNameList={['Screen__HomeButton']} />
}