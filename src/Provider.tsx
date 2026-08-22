import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import { TropicaMenuNavigation, type NavigationItem } from "./Navigation";

export type TropicaMenuContextValue = { navigation: TropicaMenuNavigation };

export const TopicaMenuContext = createContext<TropicaMenuContextValue>({
    navigation: new TropicaMenuNavigation({ name: "" })
});

type TropicaMenuProviderProps = PropsWithChildren<{ menu: NavigationItem }>;

export const TropicaMenuProvider = ({ children, menu }: TropicaMenuProviderProps) => {
    const navigation = new TropicaMenuNavigation(menu);
    const [state, setState] = useState<TropicaMenuContextValue>({ navigation });

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

    return <TopicaMenuContext.Provider value={state}>
        {children}
    </TopicaMenuContext.Provider>;
}