import { useContext } from "react";
import { Breadcrumb } from "../Breadcrumb"
import { navigationContext } from "../../lib/navigation/Provider";
import { BreadcrumbOption } from "./BreadcrumbOption";

export const FutureJourney = () => {
    const { navigation } = useContext(navigationContext);

    return <Breadcrumb
        classNameList={["FutureJourney"]}
        name={"future"}
        items={navigation.future.map(item => item)}
        renderItem={item => <BreadcrumbOption item={item}/>} />
}