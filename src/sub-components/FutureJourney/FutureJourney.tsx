import { useContext } from "react";
import { TopicaMenuContext } from "../../Provider";
import { Breadcrumb, BreadcrumbOption } from "../Breadcrumb";

export const FutureJourney = () => {
    const { navigation } = useContext(TopicaMenuContext);

    return <Breadcrumb
        classNameList={["FutureJourney"]}
        name={"future"}
        items={navigation.future.toReversed().map(item => item)}
        renderItem={item => <BreadcrumbOption item={item}/>} />
}