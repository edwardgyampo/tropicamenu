import { useContext } from "react";
import { navigationContext } from "../../lib/navigation/Provider";
import { Button, ButtonVariants } from "../Button";

export const HomeButton = () => {
    const { navigation } = useContext(navigationContext);

    return <Button
        disabled={navigation.currentItem?.name === navigation.root.name}
        onClick={_ => navigation.select(navigation.root)}
        icon="Home"
        text="Go to Start"
        variant={ButtonVariants.TextButton}
        classNameList={['Menu__homeButton']} />
}