import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import { GyampoNavigation } from ".";
import MAIN_MENU from "../../menus/main.json";


export type NavigationContextValue = { navigation: GyampoNavigation };

export const navigationContext = createContext<NavigationContextValue>({
    navigation: new GyampoNavigation({ name: ""})
});

export const NavigationProvider = ({ children }: PropsWithChildren) => {
    const navigation = new GyampoNavigation(MAIN_MENU);
    const [state, setState] = useState<NavigationContextValue>({ navigation });

    useEffect(() => {
        const callback = (event: Event) => {
            const e = event as ReturnType<typeof navigation.createSelectItemEvent>;
            setState(_ => ({
                navigation: e.detail.navigation
            }));
        };

        navigation.eventEmitter.addEventListener("selectItem", callback);

        return () => {
            navigation.eventEmitter.removeEventListener("selectItem", callback)
        }

    }, [navigation]);

    return <navigationContext.Provider value={state}>
        {children}
    </navigationContext.Provider>;
}