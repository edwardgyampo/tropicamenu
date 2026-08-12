import { useContext } from "react";
import { navigationContext } from "../../lib/navigation/Provider";
import { Breadcrumb } from "../Breadcrumb";
import { Button } from "../Button";

export const PastJourney = () => {
    const { navigation } = useContext(navigationContext);

    return <Breadcrumb
        name={"past"}
        classNameList={["PastJourney"]}
        items={navigation.past.map(item => item)}
        renderItem={item =>
            <Button
                onClick={() => navigation.select(item)}
                text={item.name} />} />
}