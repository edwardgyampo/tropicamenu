import { useContext } from "react";
import { TopicaMenuContext } from "../../Provider";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";
import { Button } from "../Button/Button";

export const PastJourney = () => {
    const { navigation } = useContext(TopicaMenuContext);

    return <Breadcrumb
        name={"past"}
        classNameList={["PastJourney"]}
        items={navigation.past.toReversed().map(item => item)}
        renderItem={item =>
            <Button
                onClick={() => navigation.select(item)}
                text={item.name} />} />
}