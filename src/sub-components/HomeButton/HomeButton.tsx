import { useContext } from "react";
import { TopicaMenuContext } from "../../Provider";
import { Button, ButtonVariants } from "../Button";
import { GyampoIcon } from "../../GyampoIcon/GyampoIcon";
import type { NavigationItem } from "../../Navigation";

export const HomeButton = (props: { item: NavigationItem }) => {
    const { item } = props;
    const { navigation } = useContext(TopicaMenuContext);

    return <Button
        disabled={item.name === navigation.root.name}
        onClick={_ => navigation.goToStart()}
        PrimaryIcon={<GyampoIcon icon={"mdi:restart"} />}
        text="BACK TO START"
        variant={ButtonVariants.StandardButton}
        classNameList={['Screen__HomeButton']} />
}